import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    HStack,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';

function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const isFormValid = email !== '' && password !== '';

    const handleLogin = () => {
        setIsLoading(true);
        let payload = {
            email,
            password
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(payload)
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                // console.log(res)
                if (res.status === 200) {
                    localStorage.setItem("user", JSON.stringify(res.user));
                    localStorage.setItem("welcome", "welcome");
                    localStorage.setItem("token", JSON.stringify(res.token));
                    setUser(res.user);
                    navigate('/dashboard');
                } else {
                    setIsLoading(false);
                    toast({
                        title: 'Login Failed.',
                        description: `${res.message}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }

            })
            .catch(error => {
                // console.log('error', error.message)
                toast(error.message);
            });

    }
    return (
        <div>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>
                            <HStack>
                                <Text>Sign in to</Text>
                                <Text color="green.400" fontFamily={'Caveat'}>Brief</Text>
                            </HStack>
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={({ target }) => {
                                        setEmail(target.value)
                                    }}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={({ target }) => {
                                        setPassword(target.value)
                                    }}
                                />
                            </FormControl>  
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link to="#" color={'green.400'}>Forgot password?</Link>
                                </Stack>
                                {/* <Link to="/dashboard"> */}
                                    <Button
                                        bg={'green.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'green.500',
                                    }}
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                    isDisabled={!isFormValid}
                                    >
                                    {isLoading ? <Spinner size="sm" color="white" /> : 'Sign in'}
                                    </Button>
                                {/* </Link> */}
                                <Stack pt={4}>
                                    <Text align={'center'}>
                                        Don't have an account? <Link to="/register" color={'green.400'}>Register</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}

export default LoginComponent

