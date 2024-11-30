import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { Link } from "react-router-dom";

interface User {
    id: number;
    name: string;
    address: { city: string };
    company: { name: string };
}

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUsers = async () => {
            const users = await fetchUsers();
            setUsers(users);
            setLoading(false);
        };

        loadUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Users List</h1>
            {users.length === 0 ? (
                <p>No users available</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <div>
                                <h3>{user.name}</h3>
                                <p>{user.address.city}</p>
                                <p>{user.company.name}</p>
                                <Link to={`/user/${user.id}`}>Подробнее</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;
