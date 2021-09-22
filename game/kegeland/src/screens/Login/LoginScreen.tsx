import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { NavigationScreenProps } from '../navigation.types';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import {
  loginUserDefaultThunk,
  loginUserDefaultThunkStatusSel,
} from '../../../state-management/user/userSlice';
import { SimpleUser } from '../../../types/user';
import { emailRegex } from '../../utils/String.utils';
import { StyleSheet } from 'react-native';
import { borderColor } from 'styled-system';


const LoginScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const loginUserDefaultThunkStatus = useAppSelector(
    loginUserDefaultThunkStatusSel
  );

  const handleRegisterPress = () => navigation.navigate('Register');

  const [formData, setData] = useState<SimpleUser>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SimpleUser>({
    email: '',
    password: '',
  });

  const validate = () => {
    let valid = true;
    if (!formData.email) {
      setErrors({
        ...errors,
        email: 'Email is required',
      });
      valid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      setErrors({
        ...errors,
        email: 'Email is not valid',
      });
      valid = false;
    }

    if (!formData.password) {
      setErrors({
        ...errors,
        password: 'Password is required',
      });
      valid = false;
    }

    return valid;
  };

  const handleLoginPress = async () => {
    if (validate()) {
      try {
        await dispatch(
          loginUserDefaultThunk({
            email: formData.email.trim(),
            password: formData.password.trim(),
          })
        ).unwrap();
        navigation.navigate('MainMenu');
      } catch {
        setErrors({
          ...errors,
          password: 'Email and password combination does not match',
        });
      }
    }
  };

  return (


   
    <ScrollView
    
 >
      <Box
         style={styles.scrollview}
        bg={{
          linearGradient: {
            colors: ['rose.300', 'pink.200'],
            start: [0, 1],
            end: [1, 0],
          },
        }}
        p={8}
        height="100%"
        w="100%"
        mx="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="xl" color="teal.500">
          Welcome
        </Heading>
   


        

        <Heading size="xl" color="teal.500">
          Welcome
        </Heading>
        <Heading color="muted.500" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={2} mt={5} w="100%">
          {/* Email */}
          <FormControl isRequired isInvalid={!!errors.email}>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
            >
              Email
            </FormControl.Label>
            <Input
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
            {!!errors.email && (
              <FormControl.ErrorMessage
                _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
              >
                {errors.email}
              </FormControl.ErrorMessage>
            )}
          </FormControl>

          {/* Password */}
          <FormControl isRequired isInvalid={!!errors.password}>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
            >
              Password
            </FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
            />
            {!!errors.password && (
              <FormControl.ErrorMessage
                _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            )}
          </FormControl>

          <VStack space={2} mt={5}>
            <Button
              colorScheme="teal"
              _text={{ color: 'white' }}
              startIcon={<AntDesign name="login" size={20} color="white" />}
              isLoading={loginUserDefaultThunkStatus === 'loading'}
              onPress={handleLoginPress}
            >
              Sign in
            </Button>
          </VStack>
          <HStack justifyContent="center" mt={4}>
            <Text fontSize="md" color="muted.700" fontWeight={400}>
              I'm a new user.
            </Text>
            <Link
              _text={{ color: 'teal.600', bold: true, fontSize: 'md' }}
              onPress={handleRegisterPress}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
    
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  scrollview: {
    borderWidth: 2,
    borderColor: 'red',
    borderStyle: 'solid'
  },
});