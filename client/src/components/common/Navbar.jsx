import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link to="/" className="text-xl font-bold">
              Issue Tracker
            </Link>
            <Flex gap="3">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
              <Link to="/issues" className="nav-link">
                Issues
              </Link>
            </Flex>
          </Flex>

          <Box>
            {isAuthenticated ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button className="cursor-pointer">
                    <Flex gap="2" align="center">
                      <Avatar
                        src={user?.image}
                        fallback={user?.name?.[0] || 'U'}
                        size="2"
                        radius="full"
                      />
                      <Text size="2" weight="medium">
                        {user?.name}
                      </Text>
                    </Flex>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <PersonIcon /> Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onClick={handleLogout} color="red">
                    <ExitIcon /> Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Login
                </button>
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
