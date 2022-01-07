import React from "react";

const ProfilePage = () => {
  return (
    <>
      <h1>Profile Page</h1>
      <form className="form-login">
        {/* <input name="_method" type="hidden" value="PUT">
      <input name="_token" type="hidden" value="qGv0O67TwwlO3SuO8KZYYpbSTLEICFLN3xiiBS9l">*/}
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Wax wallet
            <span>authorize with wax cloud wallet</span>
          </label>
          <input name="wallet" type="text" placeholder="uo.bi.wam" className="form-control"/>
        </div>
        <div>
          <button value="Update" className="btn btn-dark">Update profile</button>
        </div>
      </form>
    </>
  )
};

export default ProfilePage;