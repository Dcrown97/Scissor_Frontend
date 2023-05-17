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
} from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

function LoginComponent() {
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
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link to="#" color={'green.400'}>Forgot password?</Link>
                                </Stack>
                                <Link to="/dashboard">
                                    <Button
                                        bg={'green.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'green.500',
                                        }}>
                                        Sign in
                                    </Button>
                                </Link>
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

