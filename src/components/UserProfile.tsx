import React, {useEffect, useState} from "react";
import {fetchUserById} from "../services/api";
import {useParams} from "react-router-dom";

interface UserProfile {
    name: string;
    username: string;
    email: string;
    address: { street: string; city: string; zipcode: string };
    phone: string;
    website: string;
}

const UserProfile: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = async () => {
            if (id) {
                const userData = await fetchUserById(Number(id));
                setUser(userData);
                setLoading(false);
            }
        };

        loadUser();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
        </div>
    );
};

export default UserProfile;
