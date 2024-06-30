import { Skeleton } from "@mui/material";

/**
 * 
 * This code defines a Material-UI skeleton component that toggles between a skeleton and the children
 * based on a loading boolean. The skeleton can be either rectangular or circular.
 * 
 * @param {*} children: children to display when not loading
 * @param {*} loading: boolean to indicate if the skeleton should be displayed
 * @param {*} variant: variant of the skeleton, either rectangular or circular
 * 
 */
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