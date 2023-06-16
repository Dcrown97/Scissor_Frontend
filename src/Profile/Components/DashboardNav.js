import { Box, Button, Container, Flex, HStack, IconButton, Image, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { IoClose, IoMenu } from 'react-icons/io5';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';

function DashboardNav() {
    const { isOpen, onToggle } = useDisclosure();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser({})
        localStorage.clear();
        navigate("/login")
    }

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        setUser(savedUser);

        const token = JSON.parse(localStorage.getItem("token"));
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user._id

        fetch(`${process.env.REACT_APP_API_URL}/api/user/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                if (res.status !== 200) {
                    // console.log('error', res.error)
                    handleLogout()
                }
            })
            .catch(error => {
                console.log(error, 'error')
            });

    }, [])

    return (
        <Box background={"green.400"} w={'100%'} p={4} color='white'>
            <Container maxW="container.lg">
                <Flex align="center" justify="space-between" h="70px">
                    <Text
                        fontFamily={'Caveat'}
                        fontWeight="700"
                        fontSize="26px"
                        _hover={{
                            color: 'green.100',
                        }}
                        display={{ base: 'flex', md: 'none' }}
                    >
                        <Link to="/dashboard">BRIEF</Link>
                    </Text>
                    <HStack display={{ base: 'none', md: 'flex' }}>
                        <Text
                            fontFamily={'Caveat'}
                            fontWeight="700"
                            fontSize="26px"
                            _hover={{
                                color: 'green.100',
                            }}
                        >
                            <Link to="/dashboard">BRIEF</Link>
                        </Text>
                    </HStack>
                    <HStack spacing="50px" display={{ base: 'none', md: 'flex' }}>
                        <Link to='/custom_url'>
                            <Text
                                fontWeight="500"
                                fontSize="15px"
                                color="white"
                                _hover={{
                                    color: 'green.100',
                                }}
                            >
                                Custom URLs
                            </Text>
                        </Link>
                        <Link to="/analytics">
                            <Text
                                fontWeight="500"
                                fontSize="15px"
                                color="white"
                                _hover={{
                                    color: 'green.100',
                                }}
                            >
                                Analytics
                            </Text>
                        </Link>
                        <Link to="/link_history">
                            <Text
                                fontWeight="500"
                                fontSize="15px"
                                color="white"
                                _hover={{
                                    color: 'green.100',
                                }}
                            >
                                Link History
                            </Text>
                        </Link>
                    </HStack>
                    <HStack display={{ base: 'none', md: 'flex' }}>
                        <Button
                            background="#FFFFFF;"
                            color="black"
                            fontWeight="700"
                            fontSize="12px"
                            fontFamily="GT Walsheim Pro"
                            d={{ base: 'none', md: 'flex' }}
                            w="108px"
                            h="48px"
                            border="none"
                            rounded="8px"
                            _hover={{
                                color: 'green.100',
                                cursor: 'pointer'
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </HStack>

                    <IconButton
                        variant="outline"
                        borderColor="#110620"
                        rounded="md"
                        size="lg"
                        icon={isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                        onClick={onToggle}
                        display={{ base: 'flex', md: 'none' }}
                        _hover={{
                            bg: '#849ecf',
                            borderColor: '#849ecf',
                        }}
                    />
                </Flex>
                {isOpen && (
                    <Box p="20px" bg="white" rounded="md" mb="50px" shadow="md">
                        <Stack spacing="20px">
                            <Link to='/custom_url'>
                                <Text
                                    fontWeight="500"
                                    fontSize="15px"
                                    color="green.400"
                                    _hover={{
                                        color: 'green.100',
                                    }}
                                >
                                    Custom URLs
                                </Text>
                            </Link>
                            <Link to="/analytics">
                                <Text
                                    fontWeight="500"
                                    fontSize="15px"
                                    color="green.400"
                                    _hover={{
                                        color: 'green.100',
                                    }}
                                >
                                    Analytics
                                </Text>
                            </Link>
                            <Link to="/link_history">
                                <Text
                                    fontWeight="500"
                                    fontSize="15px"
                                    color="green.400"
                                    _hover={{
                                        color: 'green.100',
                                    }}
                                >
                                    Link History
                                </Text>
                            </Link>
                            <Button
                                color="green.400"
                                fontWeight="700"
                                fontSize="12px"
                                w="108px"
                                h="48px"
                                border="none"
                                rounded="8px"
                                _hover={{
                                    color: 'green.100',
                                    cursor: 'pointer'
                                }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Container>
        </Box >
    )
}

export default DashboardNav