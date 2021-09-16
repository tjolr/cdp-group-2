import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { API } from '../../firebase/api';
import { NavigationScreenProps } from '../navigation.types';

const LoginScreen = ({ navigation }: NavigationScreenProps) => {
  const handleLoginPress = async () => {
    try {
      await API.signInDefault('sondreo.dahl@gmail.com', 'Test123');
    } catch (e) {
      return new Error(e);
    }
    navigation.navigate('MainMenu');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <Box
      bg={{
        linearGradient: {
          colors: ['rose.300', 'pink.200'],
          start: [0, 1],
          end: [1, 0],
        },
      }}
      style={styles.container}
    >
      <Center>
        <Stack direction="column" space={'lg'}>
          <Heading>Log in</Heading>
          <Text fontSize="lg">Please log in using your Google account</Text>

          <Center>
            <Button colorScheme="teal" size="lg" onPress={handleLoginPress}>
              Email login
            </Button>
          </Center>

          <HStack justifyContent="center">
            <Text fontSize="md" color="muted.700" fontWeight={400}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{ color: 'teal.500', bold: true, fontSize: 'md' }}
              onPress={handleRegisterPress}
            >
              Sign Up
            </Link>
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
