import { Box, Text, Heading, Stack, Button, Center } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { NavigationScreenProps } from '../navigation.types';

const HomeScreen = ({ navigation }: NavigationScreenProps) => {
  const handleLoginPress = () => navigation.navigate('Login');

  return (
    <Box
      bg={{
        linearGradient: {
          colors: ['rose.300', 'pink.100'],
          start: [1, 0],
          end: [0, 1],
        },
      }}
      style={styles.container}
    >
      <Center p={10} flex={4}>
        <SimpleLineIcons name="symbol-female" size={170} color="#323232" />
      </Center>

      <Stack direction="column" space="sm" flex={1}>
        <Heading
          alignSelf={{
            base: 'center',
            md: 'flex-start',
          }}
        >
          Welcome to Kegeland
        </Heading>

        <Text fontSize="lg">Adaptive pelvic muscle trainer </Text>
      </Stack>

      <Center flex={1} pb={8}>
        <Button onPress={handleLoginPress} size="lg" colorScheme="teal">
          Get started
        </Button>
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

export default HomeScreen;
