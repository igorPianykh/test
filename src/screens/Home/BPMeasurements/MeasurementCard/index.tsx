import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles.ts';
import { BPMeasurementsType } from '../../types.ts';

const MeasurementCard: React.FC<BPMeasurementsType['bpMeasurements']> = ({
  sys,
  dia,
  pulse,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.fieldContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.name}>SYS</Text>
          <Text style={styles.unit}>mmHg</Text>
        </View>
        <Text style={styles.number}>{sys}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.fieldContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.name}>DIA</Text>
          <Text style={styles.unit}>mmHg</Text>
        </View>
        <Text style={styles.number}>{dia}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.fieldContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.name}>PULSE</Text>
          <Text style={styles.unit}>Beats/Min</Text>
        </View>
        <Text style={styles.number}>{pulse}</Text>
      </View>
    </View>
  );
};

export default MeasurementCard;
