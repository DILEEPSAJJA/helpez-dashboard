import React, { useEffect, useState } from "react";
import DefaultLayoutAdmin from "../layout/DefaultLayoutAdmin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedAdminRoute(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      toast.error("please login as admin");
      navigate("/admin");
    }
  }, []);

  return isAdmin ? (
    <DefaultLayoutAdmin>{props.children}</DefaultLayoutAdmin>
  ) : null;
}
