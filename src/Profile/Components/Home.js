import React, { useContext, useState } from 'react'
import {
    Container,
    Heading,
    Stack,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Image,
    Center,
    FormHelperText,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';
import { CopyIcon } from '@chakra-ui/icons';

function Home() {
    const [url, setUrl] = useState("")
    const [ShorteenedUrl, setShorteenedUrl] = useState("")
    const [copySuccess, setCopySuccess] = useState('');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleSubmit = () => {
        // let domainWithoutCom = url.replace(".com", "");
        let payload = {
            origUrl: url,
        }
        
        const token = JSON.parse(localStorage.getItem("token"));

        fetch(`${process.env.REACT_APP_API_URL}/api/short`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                // console.log(res, "res")
                if (res.status === 200) {
                    localStorage.setItem("url", JSON.stringify(res.url));
                    setShorteenedUrl(res.url);
                    // navigate('/dashboard');
                    onOpen();
                    toast({
                        title: 'Success.',
                        description: `${res.message}`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Failed.',
                        description: `${res.message}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }

            })
            .catch(error => {
                toast(error.message);
            });
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(ShorteenedUrl.shortUrl)
            .then(() => setCopySuccess('Copied!'))
        toast({
            title: 'Copied!',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    };

    const handleDownload = () => {
        console.log("first")
        fetch(`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${ShorteenedUrl.shortUrl}`)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'image.jpg';

                // Simulate a click on the link to trigger the download
                a.click();

                // Cleanup
                window.URL.revokeObjectURL(url);
            });
    }
    
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
                    <FormControl id="url">
                        <Input
                            type="text"
                            name="url"
                            value={url}
                            placeholder='Enter URL Here'
                            onChange={({ target }) => {
                                setUrl(target.value)
                            }}
                        />
                        <FormHelperText>Note: The URL must carry http</FormHelperText>
                    </FormControl>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'green'}
                        bg={'green.400'}
                        _hover={{ bg: 'green.500' }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Here's your Brief link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign="center" pb={6}>
                        <Text>
                            {ShorteenedUrl.shortUrl}
                            <CopyIcon _hover={{ cursor: 'pointer' }} ml="10" onClick={handleCopyClick} />
                        </Text>
                        <Center>
                            <Image
                                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${ShorteenedUrl.shortUrl}`}
                            />
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleDownload} colorScheme='blue' mr={3}>
                            Download QR Code Link
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Container>
    )
}
export default Home
