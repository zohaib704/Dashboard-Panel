import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { Grid } from "@mui/material";
import moment from "moment";
export function ChangeStatus({
  open,
  handleOpen,
  data,
  handleChange,
  statusLoading,
}) {
  const [note, setNote] = useState("");
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <DialogHeader>
            <Typography variant="h4">Change Problem Status</Typography>
          </DialogHeader>
          <div
            className="mr-6 w-6 h-6 flex items-center justify-center border-2 border-dark rounded-full cursor-pointer"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="h-4 w-4 font-extrabold"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <DialogBody className=" font-normal h-80 overflow-y-scroll">
          <Grid
            container
            sx={{
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item md={6} sm={12}>
              Date Posted: {moment(data?.createdAt).format("MM/DD/YYYY")}
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="flex items-center justify-between">
                Status to be changed:
                <span
                  className={` relative inline-flex items-center justify-between cursor-pointer ${
                    data?.status === "pending"
                      ? "bg-yellow-800"
                      : data?.status === "closed"
                      ? "bg-green-800"
                      : data?.status === "rejected"
                      ? "bg-red-800"
                      : "bg-orange-800"
                  } text-white text-xs font-medium me-2 px-2.5 py-1 rounded-full`}
                >
                  {data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
                </span>
              </div>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "30px" }}>
              <Typography className="font-normal text-sm text-dark mb-3">
                Problem Resolution Notes
              </Typography>
              <textarea
                className={`text-sm w-full p-3 border border-gray-500
                 rounded-md focus:outline-none focus:border-primary`}
                name="description"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write detail here..."
                rows={6}
              />
            </Grid>
          </Grid>
          <div className="text-center"></div>
        </DialogBody>
        <DialogFooter className="flex items-center jusify-center w-full pe-8">
          <button
            className="w-full bg-[#fadb4d] p-2 rounded-full text-white font-bold "
            variant="gradient"
            // color="#Fcdd4c"
            onClick={() => handleChange(note)}
          >
            {statusLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-dark"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
