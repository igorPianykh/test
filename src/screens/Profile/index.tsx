import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { useToast } from '@gluestack-ui/themed';
import * as Keychain from 'react-native-keychain';
import { UserContext } from '../../context/userContext.tsx';
import { MainButton, PageLayout } from '../../components';
import { titles } from '../../utils/constants.ts';
import Toast from '../../components/Toast';
import styles from './styles.ts';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const handleLogOut = async () => {
    try {
      setUser(null);
      await Keychain.resetGenericPassword();
      toast.show({
        placement: 'bottom',
        render: () => {
          return <Toast text={titles.loggedOut} action="success" />;
        },
      });
    } catch (error) {}
  };
  return (
    <PageLayout title={titles.profile}>
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Text style={styles.text} accessibilityLabel="profile-name">
            {user?.name}
          </Text>
          <Text style={styles.text} accessibilityLabel="profile-email">
            {user?.email}
          </Text>
        </View>
        <MainButton
          onPress={handleLogOut}
          buttonText={titles.logOut}
          accessibilityLabel="logout-button"
        />
      </View>
    </PageLayout>
  );
};

export default Profile;
