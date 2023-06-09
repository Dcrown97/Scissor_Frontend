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
    Box,
    Spinner,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';
import { CopyIcon } from '@chakra-ui/icons';

function CustomUrl() {
    const [url, setUrl] = useState("")
    const [customUrl, setCustomUrl] = useState("")
    const [ShorteenedUrl, setShorteenedUrl] = useState("")
    const [copySuccess, setCopySuccess] = useState('');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        let domainWithoutCom = customUrl.replace(".com", "");
        let payload = {
            origUrl: url,
            customUrl: domainWithoutCom
        }
        const token = JSON.parse(localStorage.getItem("token"));

        fetch(`${process.env.REACT_APP_API_URL}/api/custom`, {
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
                    setIsLoading(false);
                    localStorage.setItem("url", JSON.stringify(res.newUrl));
                    setShorteenedUrl(res.newUrl);
                    // navigate('/dashboard');
                    onOpen();
                    toast({
                        title: 'Success.',
                        description: `${res.message}`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                } else if (res.status === 429) {
                    setIsLoading(false);
                    // console.log('analytics', res)
                    toast({
                        title: 'Failed.',
                        description: `${res.error}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                } else {
                    setIsLoading(false);
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
                setIsLoading(false);
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
        setIsLoading(true);
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
        setIsLoading(false);
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
                    Create Custom URL Name
                    {/* <Text as={'span'} color={'orange.400'}>
                        made easy
                    </Text> */}
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Create a custom url in minutes with any name of your choice on brief
                </Text>
                <Box spacing={4} display={{ base: 'grid', md: 'flex' }}>
                    <FormControl id="url" mr="10px" mb="5" isRequired>
                        <FormLabel>Main URL</FormLabel>
                        <Input
                            type="text"
                            name="url"
                            value={url}
                            placeholder='Enter URL Here'
                            onChange={({ target }) => {
                                setUrl(target.value)
                            }}
                        />
                        {/* <FormHelperText>Note: The URL must carry http</FormHelperText> */}
                    </FormControl>
                    <FormControl id="url" mr="10px">
                        <FormLabel>Custom URL</FormLabel>
                        <Input
                            type="text"
                            name="customUrl"
                            value={customUrl}
                            placeholder='Enter Custom Name Here'
                            onChange={({ target }) => {
                                setCustomUrl(target.value)
                            }}
                        />
                    </FormControl>
                    <Button
                        mt="30px"
                        rounded={'full'}
                        px={6}
                        colorScheme={'green'}
                        bg={'green.400'}
                        _hover={{ bg: 'green.500' }}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner size="sm" color="white" /> : 'Submit'}
                    </Button>
                </Box>
            </Stack>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Here's your Brief link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign="center" pb={6}>
                        <Text>
                            {ShorteenedUrl.shortUrl}
                            <CopyIcon _hover={{cursor: 'pointer'}} ml="10" onClick={handleCopyClick} />
                        </Text>
                        <Center>
                            <Image
                                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${ShorteenedUrl.shortUrl}`}
                            />
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleDownload}
                            colorScheme='blue'
                            mr={3}
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner size="sm" color="white" /> : 'Download QR Code Link'}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Container>
    )
}

export default CustomUrl