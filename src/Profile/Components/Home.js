import React from 'react'
import {
    Container,
    Heading,
    Stack,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '4xl' }}
                    lineHeight={'110%'}>
                    Enter your URL in the input below
                    {/* <Text as={'span'} color={'orange.400'}>
                        made easy
                    </Text> */}
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Brief help make everything short as possible. <br />
                    Brief is a simple tool which makes URLs as short as possible.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <FormControl id="email">
                        <Input type="email" placeholder='Enter URL Here' />
                    </FormControl>
                    <Link to=''>
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'green'}
                            bg={'green.400'}
                            _hover={{ bg: 'green.500' }}>
                            Submit
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Home
