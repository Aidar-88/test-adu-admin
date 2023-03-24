import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { ICreateNewBanner } from "../../../types/IBanner";
import { ITag } from "../../../types/ITag";

interface Props {
  tagData: ITag[];
  banner: ICreateNewBanner;
}

const BannerBlocks: React.FC<Props> = ({ tagData, banner }) => {
  return (
    <Grid
      item
      xs={9}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container direction={"column"} rowSpacing={2}>
        <Grid item>
          <Typography>Banner Desktop</Typography>
          {banner.file ? (
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <img
                src={URL.createObjectURL(banner.file)}
                style={{
                  width: "100%",
                  height: "180px",
                  borderRadius: "15px",
                  objectFit: "contain",
                }}
              />
              {tagData?.map((tag) => (
                <>
                  {tag.id === banner.tagId && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "40px",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        background: "#8A3FFC",
                        p: "7px",
                        px: "20px",
                        borderRadius: "15px",
                        color: "white",
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {tag.name}
                      </Typography>
                    </Box>
                  )}
                </>
              ))}
            </Box>
          ) : (
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                height: "140px",
                backgroundColor: "#F2F4F5",
                borderRadius: "25px",
                p: "20px",
              }}
            >
              {tagData?.map((tag) => (
                <>
                  {tag.id === banner.tagId && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        background: "#8A3FFC",
                        p: "7px",
                        px: "20px",
                        borderRadius: "15px",
                        color: "white",
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {tag.name}
                      </Typography>
                    </Box>
                  )}
                </>
              ))}
            </Paper>
          )}
        </Grid>
        <Grid
          item
          container
          columns={6}
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={2}>
            <Typography>Banner Mobile</Typography>
            {banner.file_mobile ? (
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <img
                  src={URL.createObjectURL(banner.file_mobile)}
                  style={{
                    width: "100%",
                    height: "320px",
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />
                {tagData?.map((tag) => (
                  <>
                    {tag.id === banner.tagId && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "40px",
                          left: "50%",
                          transform: "translate(-50%, 0)",
                          background: "#8A3FFC",
                          p: "7px",
                          px: "20px",
                          borderRadius: "15px",
                          color: "white",
                        }}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {tag.name}
                        </Typography>
                      </Box>
                    )}
                  </>
                ))}
              </Box>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  position: "relative",
                  height: "320px",
                  backgroundColor: "#F2F4F5",
                  borderRadius: "25px",
                  p: "20px",
                }}
              >
                {tagData?.map((tag) => (
                  <>
                    {tag.id === banner.tagId && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "20px",
                          left: "50%",
                          transform: "translate(-50%, 0)",
                          background: "#8A3FFC",
                          p: "7px",
                          px: "20px",
                          borderRadius: "15px",
                          color: "white",
                        }}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {tag.name}
                        </Typography>
                      </Box>
                    )}
                  </>
                ))}
              </Paper>
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography>Banner Tablet</Typography>
            {banner.file_mobile ? (
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <img
                  src={URL.createObjectURL(banner.file_mobile)}
                  style={{
                    width: "100%",
                    height: "320px",
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />
                {tagData?.map((tag) => (
                  <>
                    {tag.id === banner.tagId && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "40px",
                          left: "50%",
                          transform: "translate(-50%, 0)",
                          background: "#8A3FFC",
                          p: "7px",
                          px: "20px",
                          borderRadius: "15px",
                          color: "white",
                        }}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {tag.name}
                        </Typography>
                      </Box>
                    )}
                  </>
                ))}
              </Box>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  position: "relative",
                  height: "320px",
                  backgroundColor: "#F2F4F5",
                  borderRadius: "25px",
                  p: "20px",
                }}
              >
                {tagData?.map((tag) => (
                  <>
                    {tag.id === banner.tagId && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "20px",
                          left: "50%",
                          transform: "translate(-50%, 0)",
                          background: "#8A3FFC",
                          p: "7px",
                          px: "20px",
                          borderRadius: "15px",
                          color: "white",
                        }}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {tag.name}
                        </Typography>
                      </Box>
                    )}
                  </>
                ))}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BannerBlocks;
