import { Box, Button, Center, Heading, Stack, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';

const LoginScreen = ({ navigation }: NavigationScreenProps) => {
  const handleLoginPress = async () => {
    navigation.navigate('MainMenu');
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
              Google login
            </Button>
          </Center>
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
