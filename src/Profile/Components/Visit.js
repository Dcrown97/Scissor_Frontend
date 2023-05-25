import { CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container, Link, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Visit() {
    const [visit, setVisit] = useState([])
    const [url, setUrl] = useState()
    const { id } = useParams();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));

        fetch(`${process.env.REACT_APP_API_URL }/api/visit/${id}`, {
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
                console.log(res.urlDetail, "res")
                if (res.status === 200) {
                    localStorage.setItem("visit", JSON.stringify(res.data));
                    setVisit(res.data);
                    setUrl(res.urlDetail);
                }
            })
            .catch(error => {
                console.log(error, 'error')
            });
    }, [])

    return (
        <div>
            <Container>
                <Accordion py={{ base: 20, md: 18 }} allowToggle>
                    <Box mb="2">
                        <Text>See all visits below</Text>
                    </Box>
                    {
                        visit.map((item, i) => {
                            return (
                                <AccordionItem
                                    border="1px solid #ccc"
                                    mb="20px"
                                    bg="#fff"
                                    rounded="lg"
                                    p="20px"
                                    key={i}
                                >
                                    <Text fontSize="md" _hover={{ bg: 'green.200', rounded: 'md' }} fontFamily="Nimbus Black">
                                        <AccordionButton rounded="lg">
                                            <Box flex="1" textAlign="left" w='100%'>
                                                Url: {url.shortUrl}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </Text>
                                    <AccordionPanel pb={4}>
                                        <List spacing={3}>
                                            <ListItem>
                                                <ListIcon as={CheckIcon} color='green.500' />
                                                Location: {item.location}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon as={CheckIcon} color='green.500' />
                                                IP Address: {item.ipAddress}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon as={CheckIcon} color='green.500' />
                                                Device: {item.device}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon as={CheckIcon} color='green.500' />
                                                Date: {new Date(item.date).toLocaleString()}
                                            </ListItem>
                                        </List>
                                    </AccordionPanel>
                                </AccordionItem>
                            )
                        })
                    }
                </Accordion>
            </Container>
        </div>
    )
}

export default Visit