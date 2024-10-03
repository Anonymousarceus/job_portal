import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4 sm:px-6 md:px-8">
        <h1 className="text-xl sm:text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <Button variant="outline" onClick={toggleMenu}>
            <Menu />
          </Button>
        </div>

        {/* Nav Links for larger screens */}
        <div className="hidden sm:flex items-center gap-6 sm:gap-8 md:gap-12">
          <ul className="hidden sm:flex font-medium items-center gap-3 sm:gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li className="text-sm sm:text-base">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="text-sm sm:text-base">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-sm sm:text-base">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-sm sm:text-base">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="text-sm sm:text-base">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Links */}
          {!user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/login">
                <Button variant="outline" className="text-xs sm:text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-xs sm:text-sm">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 sm:w-80">
                <div className="flex gap-2 sm:gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">{user?.fullname}</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link" className="text-xs sm:text-sm">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-xs sm:text-sm"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <ul className="flex flex-col items-start gap-4 p-4 border-t border-gray-200">
            {user && user.role === "recruiter" ? (
              <>
                <li className="text-sm">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="text-sm">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-sm">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-sm">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="text-sm">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}

            {/* Mobile Auth Links */}
            {!user && (
              <div className="flex flex-col gap-4">
                <Link to="/login">
                  <Button variant="outline" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-sm">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
