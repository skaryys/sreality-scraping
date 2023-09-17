import { IconButton, IconButtonProps } from '@chakra-ui/react'

function PageButton({ icon, isDisabled, opacity, cursor, fontSize, onClick }: IconButtonProps) {
    return (
        <IconButton
            icon={icon}
            aria-label="Pagination button"
            bg="#8b0000"
            borderRadius="50%"
            width="50px"
            height="50px"
            fontSize={fontSize ?? '40px'}
            color="#ffffff"
            isDisabled={isDisabled}
            opacity={opacity}
            cursor={cursor}
            onClick={onClick}
        />
    )
}

export default PageButton
