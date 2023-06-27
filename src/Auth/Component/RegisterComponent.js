import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

function RegisterComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = () => {
        setIsLoading(true);
        let payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
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
                    toast({
                        title: 'Account created.',
                        description: "Registration Successfully, Pls Login",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    setTimeout(() => {
                        navigate('/login');
                    }, 5000)
                } else {
                    setIsLoading(false);
                    toast({
                        title: 'Registration Failed.',
                        description: `${res.message}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }

            })
            .catch(error => {
                setIsLoading(false);
                console.log('error', error.message)
                toast({
                    title: 'Registration Failed.',
                    description: `${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
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
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            <HStack>
                                <Text>Sign up on</Text>
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
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            onChange={({ target }) => {
                                                setFirstName(target.value)
                                            }}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" mt={{ base: '20px', md: 'none' }} isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            onChange={({ target }) => {
                                                setLastName(target.value)
                                            }}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
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
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={password}
                                        onChange={({ target }) => {
                                            setPassword(target.value)
                                        }}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                {/* <Link to="/dashboard"> */}
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'green.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'green.500',
                                        }}
                                    onClick={handleRegister}
                                    disabled={isLoading}
                                    >
                                    {isLoading ? <Spinner size="sm" color="white" /> : 'Sign up'}
                                    </Button>
                                {/* </Link> */}
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link to="/login" color={'green.400'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}

export default RegisterComponent