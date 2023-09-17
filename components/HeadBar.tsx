import { Flex, Text } from '@chakra-ui/react'

function HeadBar() {
    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            right="0"
            bg="#ffffff"
            height="60px"
            alignItems="center"
            padding="0 20px"
            boxShadow="0 4px 2px -2px gray"
        >
            <Text fontSize="2xl">Sreality scraping task</Text>
        </Flex>
    )
}

export default HeadBar
