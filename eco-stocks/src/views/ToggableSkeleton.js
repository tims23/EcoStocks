import { Skeleton } from "@mui/material";

const ToggableSkeleton = ({ children, loading, variant="rectangular"}) => {
    if (loading) {
        return (
            <Skeleton variant={variant} sx={{ bgcolor: 'grey.900' }}>
                {children}
            </Skeleton>
        )
    }

    return children
}

export default ToggableSkeleton;