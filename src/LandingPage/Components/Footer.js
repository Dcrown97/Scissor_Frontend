// import React from 'react'
import React from 'react';
import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    Button,
} from '@chakra-ui/react';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

function Footer() {
    var nowDate = new Date();
    var date = nowDate.getFullYear();
    return (
        <div>
            <Box
                bg={useColorModeValue('gray.50', 'gray.900')}
                color={useColorModeValue('gray.700', 'gray.200')}>

                <Box
                    borderTopWidth={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Container
                        as={Stack}
                        maxW={'6xl'}
                        py={4}
                        direction={{ base: 'column', md: 'row' }}
                        spacing={4}
                        justify={{ md: 'space-between' }}
                        align={{ md: 'center' }}>
                        <Text>© {date} Brief. All rights reserved</Text>
                        <Stack direction={'row'} spacing={6}>
                            <Button label={'Twitter'} href={'#'}>
                                <FaLinkedin />
                            </Button>
                            <Button label={'Twitter'} href={'#'}>
                                <FaTwitter />
                            </Button>
                            <Button label={'Facebook'} href={'#'}>
                                <FaFacebook />
                            </Button>
                            <Button label={'Instagram'} href={'#'}>
                                <FaInstagram />
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </div>
    )
}

export default Footer
