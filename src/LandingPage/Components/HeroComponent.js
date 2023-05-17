import React from 'react'
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function HeroComponent() {
    return (
        <Container maxW={'3xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
                py={{ base: 20, md: 36 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Welcome To <br />
                    <Text as={'span'} fontFamily={'Caveat'} color={'green.400'}>
                        BRIEF
                    </Text>
                </Heading>
                <Text color={'gray.500'}>
                    Brief help make everything short as possible. <br />
                    Brief is a simple tool which makes URLs as short as possible.
                </Text>
                <Stack
                    direction={'column'}
                    spacing={3}
                    align={'center'}
                    alignSelf={'center'}
                    position={'relative'}>
                    <Link to="/register">
                        <Button
                            colorScheme={'green'}
                            bg={'green.400'}
                            rounded={'full'}
                            px={6}
                            _hover={{
                                bg: 'green.500',
                            }}>
                            Get Started
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Container>
    )
}

export default HeroComponent