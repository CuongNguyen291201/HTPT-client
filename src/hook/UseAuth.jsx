import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function useAuth({ authen, unAuthen }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!!authen) {
            navigate(authen)
        }
        if (!!unAuthen) {
            navigate(unAuthen);
        }
    }, [authen, unAuthen, navigate])
}