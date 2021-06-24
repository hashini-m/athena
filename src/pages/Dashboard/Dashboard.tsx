import React from "react";
import styles from "./Dashboard.module.scss";
import { PrimaryButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/actions";
import { AppLayout } from "../../components";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state: any) => state.user.userDetail);

  const buttonClickEvent = () => {
    console.log("Clicked");
    dispatch(userActions.getUserDetail(2));
  };
  return (
    <React.Fragment>
      <AppLayout>
        <p>Load child components here</p>
        {userDetail.isLoading && <p>Fetching user...</p>}
        {!!userDetail.data && !!userDetail.data.name && (
          <p>User name is {userDetail.data.name}</p>
        )}
        <PrimaryButton label="Fetch User" onClick={buttonClickEvent} />
      </AppLayout>
    </React.Fragment>
  );
};

export default Dashboard;
