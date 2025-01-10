import { useUser } from "@auth0/nextjs-auth0";

const Account = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Please log in to view your account details.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Account;