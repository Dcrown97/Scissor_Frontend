import { Box, Button, Container, Flex, HStack, IconButton, Image, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { IoClose, IoMenu } from 'react-icons/io5';
import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
    const { isOpen, onToggle } = useDisclosure();
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
                        <Link to="/">BRIEF</Link>
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
                            <Link to="/">BRIEF</Link>
                        </Text>
                    </HStack>
                    <HStack display={{ base: 'none', md: 'flex' }}>
                        <Link to="/login">
                            <Button
                                background="#FFFFFF;"
                                color="black"
                                fontWeight="700"
                                fontSize="12px"

                                d={{ base: 'none', md: 'flex' }}
                                w="108px"
                                h="48px"
                                border="none"
                                rounded="8px"
                                _hover={{
                                    color: 'green.100',
                                    cursor: 'pointer'
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                background="none"
                                color="#ffffff"
                                fontWeight="700"
                                fontSize="12px"

                                d={{ base: 'none', md: 'flex' }}
                                w="108px"
                                h="48px"
                                border="1px solid #DFDFE0"
                                rounded="8px"
                                _hover={{
                                    color: 'green.100',
                                    cursor: 'pointer'
                                }}
                            >
                                Register
                            </Button>
                        </Link>
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
                            <Link to="/login">
                                <Text
                                    fontWeight="500"
                                    fontSize="15px"
                                    color="green.400"
                                    _hover={{
                                        color: 'green.100',
                                    }}
                                >
                                    Login
                                </Text>
                            </Link>
                            <Link to="/register">
                                <Text
                                    fontWeight="500"
                                    fontSize="15px"
                                    color="green.400"
                                    _hover={{
                                        color: 'green.100',
                                    }}
                                >
                                    Register
                                </Text>
                            </Link>
                        </Stack>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

export default NavBar