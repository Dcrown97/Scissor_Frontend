import { Box, Button, Container, Flex, HStack, IconButton, Image, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { IoClose, IoMenu } from 'react-icons/io5';
import React from 'react'
import { Link } from 'react-router-dom';

function DashboardNav() {
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
                    <HStack spacing="50px" display={{ base: 'none', md: 'flex' }}>
                        <Link to='/custom_urls'>
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
                        <Link to="/qr_code_generation">
                            <Text
                                fontWeight="500"
                                fontSize="15px"
                                color="white"
                                _hover={{
                                    color: 'green.100',
                                }}
                            >
                                QR Code Generation
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
                        <Link to="/">
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
                            >
                                Logout
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
                            <Link to='/custom_urls'>
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
                            <Link to="/qr_code_generation">
                                <Text
                                    fontWeight="500"
                                    fontSize="15px"
                                    color="green.400"
                                    _hover={{
                                        color: 'green.100',
                                    }}
                                >
                                    QR Code Generation
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
                            <Link to="/">
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
                                >
                                    Logout
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                )}
            </Container>
        </Box >
    )
}

export default DashboardNav