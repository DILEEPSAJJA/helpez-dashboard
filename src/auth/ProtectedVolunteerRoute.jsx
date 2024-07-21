import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultLayoutVolunteer from "../layout/DefaultLayoutVolunteer";

export default function ProtectedVolunteerRoute(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isVolunteer, setIsVolunteer] = useState(false);

  useEffect(() => {
    if (user && user.isVolunteer) {
      setIsVolunteer(true);
    } else {
      toast.error("please login as volunteer");
      navigate("/volunteer");
    }
  }, []);

  return isVolunteer ? (
    <DefaultLayoutVolunteer>{props.children}</DefaultLayoutVolunteer>
  ) : null;
}
