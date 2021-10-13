import {
  Button,
  VStack,
  FormControl,
  Input,
  Box,
  Heading,
  ScrollView,
  Text,
  HStack,
  Link,
} from 'native-base';
import React, { useState } from 'react';
import { emailRegex, passwordRegex } from '../../utils/String.utils';
import { NavigationScreenProps } from '../navigation.types';
import { AntDesign } from '@expo/vector-icons';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import {
  registerUserDefaultThunk,
  registerUserDefaultThunkStatusSel,
} from '../../../state-management/user/userSlice';
import { RegisterFormData } from '../../../types/user';
import { scrollViewStyles } from '../../common/scrollView';

const RegisterScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const registerUserDefaultThunkStatus = useAppSelector(
    registerUserDefaultThunkStatusSel
  );

  const [formData, setData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    let valid = true;
    if (!formData.firstName) {
      setErrors({
        ...errors,
        firstName: 'First name is required',
      });
      valid = false;
    } else if (formData.firstName.length < 3) {
      setErrors({
        ...errors,
        firstName: 'First name is too short',
      });
      valid = false;
    }

    if (!formData.lastName) {
      setErrors({
        ...errors,
        lastName: 'Last name is required',
      });
      valid = false;
    } else if (formData.lastName.trim().length < 3) {
      setErrors({
        ...errors,
        lastName: 'Last name is too short',
      });
      valid = false;
    }

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
    } else if (!passwordRegex.test(formData.password.trim())) {
      setErrors({
        ...errors,
        password:
          'Password must contain minimum eight characters, at least one letter and one number',
      });
      valid = false;
    } else if (!formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Confirm Password is required',
      });
      valid = false;
    } else if (formData.confirmPassword.trim() !== formData.password.trim()) {
      setErrors({
        ...errors,
        password: 'Passwords does not match',
        confirmPassword: 'Passwords does not match',
      });
    }
    return valid;
  };

  const handleRegisterPress = async () => {
    if (validate()) {
      try {
        await dispatch(
          registerUserDefaultThunk({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
            confirmPassword: formData.confirmPassword.trim(),
          })
        ).unwrap();
        navigation.navigate('MainMenu');
      } catch (e) {
        return new Error('Could not register user.');
      }
    }
  };

  const handleLoginPress = () => navigation.navigate('Login');

  return (
    <Box style={scrollViewStyles.container}>
      <ScrollView style={scrollViewStyles.scrollView}>
        <Box
          bg={{
            linearGradient: {
              colors: ['rose.300', 'pink.200'],
              start: [0, 1],
              end: [1, 0],
            },
          }}
          p={8}
          minHeight="100%"
          w="100%"
          mx="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ flex: 1 }}
        >
          <Heading color="teal.500" my={1}>
            Register account
          </Heading>

          <Heading color="muted.500" size="xs">
            Fill in your user information
          </Heading>
          <VStack space={2} mt={5} w="100%">
            {/* First Name */}
            <FormControl isRequired isInvalid={!!errors.firstName}>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
              >
                First name
              </FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setData({ ...formData, firstName: value })
                }
              />
              {!!errors.firstName && (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: 'xs',
                    color: 'error.500',
                    fontWeight: 500,
                  }}
                >
                  {errors.firstName}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            {/* Last Name */}
            <FormControl isRequired isInvalid={!!errors.lastName}>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
              >
                Last name
              </FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setData({ ...formData, lastName: value })
                }
              />
              {!!errors.lastName && (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: 'xs',
                    color: 'error.500',
                    fontWeight: 500,
                  }}
                >
                  {errors.lastName}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

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
                  _text={{
                    fontSize: 'xs',
                    color: 'error.500',
                    fontWeight: 500,
                  }}
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
                  _text={{
                    fontSize: 'xs',
                    color: 'error.500',
                    fontWeight: 500,
                  }}
                >
                  {errors.password}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            {/* Confirm password */}
            <FormControl isRequired isInvalid={!!errors.confirmPassword}>
              <FormControl.Label
                _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
              >
                Confirm Password
              </FormControl.Label>
              <Input
                type="password"
                onChangeText={(value) =>
                  setData({ ...formData, confirmPassword: value })
                }
              />
              {!!errors.confirmPassword && (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: 'xs',
                    color: 'error.500',
                    fontWeight: 500,
                  }}
                >
                  {errors.confirmPassword}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <VStack space={2} mt={5}>
              <Button
                onPress={handleRegisterPress}
                colorScheme="teal"
                _text={{ color: 'white' }}
                startIcon={<AntDesign name="adduser" size={20} color="white" />}
                isLoading={registerUserDefaultThunkStatus === 'loading'}
              >
                Sign up
              </Button>
            </VStack>

            <HStack
              justifyContent="center"
              mt={4}
              style={{ marginBottom: 100 }}
            >
              <Text fontSize="md" color="muted.700" fontWeight={400}>
                Already have an account?{' '}
              </Text>
              <Link
                _text={{ color: 'teal.600', bold: true, fontSize: 'md' }}
                onPress={handleLoginPress}
              >
                Sign in
              </Link>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default RegisterScreen;
