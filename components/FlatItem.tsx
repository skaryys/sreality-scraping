import { FlatType } from '@/types'
import { Box, Text } from '@chakra-ui/react'

export interface FlatItemProps {
    flat: FlatType
}

function FlatItem({ flat }: FlatItemProps) {
    return (
        <Box width="100%" bg="#ffffff" height="100%">
            <Box
                width="100%"
                paddingTop="75%"
                bg={'url(' + flat.image + ')'}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
            ></Box>
            <Text textAlign={'center'} padding="20px" fontWeight={700}>
                {flat.title}
            </Text>
        </Box>
    )
}

export default FlatItem
