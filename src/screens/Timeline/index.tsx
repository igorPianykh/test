import React, { useCallback, useContext, useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DB } from '@op-engineering/op-sqlite';
import { chain } from 'lodash';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useToast } from '@gluestack-ui/themed';
import { errorTitles, titles } from '../../utils/constants.ts';
import { FormattedMeasurementData, MeasurementItem } from './entities.ts';
import styles from './styles.ts';
import { getMeasurementsForUser } from '../../services/database';
import { DatabaseContext } from '../../../App.tsx';
import { UserContext } from '../../context/userContext.tsx';
import { primaryGreen } from '../../assets/colors.ts';
import Toast from '../../components/Toast';

const Timeline = () => {
  const toast = useToast();
  const db = useContext(DatabaseContext) as DB;
  const { user } = useContext(UserContext);
  const [data, setData] = useState<FormattedMeasurementData>([]);

  useFocusEffect(
    useCallback(() => {
      const getMeasurements = async () => {
        try {
          const measurements = await getMeasurementsForUser(db, user!.id);

          const formattedData = chain(measurements)
            .groupBy(item => item.timestamp.split(',')[0])
            .map((items, date) => ({
              title: date,
              data: items.map(item => ({
                sys: item.sys,
                dia: item.dia,
                pulse: item.pulse,
                time: item.timestamp.split(',')[1].trim().substring(0, 5),
              })),
            }))
            .value();

          setData(formattedData);
        } catch (error) {
          toast.show({
            placement: 'bottom',
            render: () => {
              return (
                <Toast
                  text={errorTitles.failedOnReceivingMeasurements}
                  action="error"
                />
              );
            },
          });
        }
      };
      getMeasurements();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<MeasurementItem>;
  }) => {
    return (
      <View style={styles.sectionHeader}>
        <Ionicon name="calendar" size={20} color={primaryGreen} />
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const renderItem = ({
    item,
    index,
    section,
  }: SectionListRenderItemInfo<MeasurementItem>) => {
    const isLast = index === section.data.length - 1;
    return (
      <View>
        <View style={styles.itemContainer}>
          <Text>{item.time}</Text>
          <View style={styles.measurementContainer}>
            <View style={styles.measurement}>
              <Text style={styles.value}>{item.sys}</Text>
              <Text style={styles.unit}>{titles.sys}</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.value}>{item.dia}</Text>
              <Text style={styles.unit}>{titles.dia}</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.value}>{item.pulse}</Text>
              <Text style={styles.unit}>{titles.pulse}</Text>
            </View>
          </View>
        </View>
        {!isLast && <View style={styles.divider} />}
      </View>
    );
  };

  const emptyData = () => (
    <View style={styles.sectionHeader}>
      <Ionicon name="note-off-outline" size={20} color={primaryGreen} />
      <Text style={styles.sectionHeaderText}>No measurements.</Text>
    </View>
  );

  const keyExtractor = (item: MeasurementItem) => {
    return item.time;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{titles.timeline}</Text>
      </View>
      <View style={styles.container}>
        <SectionList
          sections={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyData}
        />
      </View>
    </SafeAreaView>
  );
};

export default Timeline;
