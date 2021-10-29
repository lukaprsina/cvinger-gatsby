import React from "react"
import { Box, Button, Typography } from "@mui/material"
import ArticleImage from "./ArticleImage"

/* const useStyles = makeStyles({
    box: {
        marginTop: "40px",
        backgroundColor: props => props?.palette?.secondary?.main,
    },

    container: {
        maxWidth: "800px",
        padding: "20px",
    },

    avtorstvoWrapper: {
        margin: "20px 0",
        display: "flex",
    },

    avtorstvo: {
        margin: "auto",
        width: "100%",
    },

    logoContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
    },

    logoLink: {
        width: "200px",
        height: "100px",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "40px 0",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
    },

    obcinaDT: {
        textAlign: "center",
        fontSize: "12px",
        color: "black",
        textDecoration: "none",
        marginTop: "5px",
        marginBottom: "-47px",
    },
}) */

function Logo({ children, href, style = {} }) {
    return (
        <a href={href} style={style} target="_blank" rel="noreferrer">
            {children}
        </a>
    )
}

const Footer = () => {
    return (
        <Box
            /* className={classes.box} */ sx={{
                margin: "40px auto auto auto",
                backgroundColor: "palette.secondary.main",
            }}
        >
            <Box
                sx={{
                    maxWidth: "800px",
                    margin: "auto",
                }} /* className={classes.container} */
            >
                <Box
                    sx={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        justifyContent: "space-between",
                        "& a": { textDecoration: "none", color: "inherit", width: "200px", height: "100px" }
                    }} /* className={classes.logoContainer} */
                >
                    <Logo
                        href="http://arheologija.ff.uni-lj.si/"
                        style={{ maxWidth: "90px" }}
                    >
                        <ArticleImage
                            src={"/images/logo/filozofska_fakulteta.svg"}
                            alt="Univerza v Ljubljani: Filozofska fakulteta"
                        />
                    </Logo>
                    <Logo href="https://www.zvkds.si">
                        <ArticleImage
                            src={"/images/logo/ZVKDS.svg"}
                            alt="Zavod za varstvo kulturne dediščine Slovenije"
                        />
                    </Logo>
                    <Logo
                        href="https://www.dolenjskimuzej.si/"
                        style={{ transform: "translateY(18px)" }}
                    >
                        <ArticleImage src={"/images/logo/dolenjski_muzej.svg"} alt="Dolenjski muzej" />
                    </Logo>
                    <Logo
                        href="https://dolenjske-toplice.si/"
                        style={{ maxWidth: "121px" }}
                    >
                        <Box sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            height: "auto"
                        }}>
                            <ArticleImage
                                src={"/images/logo/obcina_dolenjske_toplice.svg"}
                                caption="Občina Dolenjske Toplice"
                                style={{ maxHeight: "80px" }}
                            />
                            <Typography
                                /* className={classes.obcinaDT} */
                                sx={{
                                    margin: "5px 0",
                                    /* textAlign: "center",
                                    fontSize: "12px",
                                    color: "black",
                                    textDecoration: "none",
                                    marginBottom: "-47px", */
                                }}
                                align="center"
                                variant="subtitle2"
                            >
                                Občina Dolenjske Toplice
                            </Typography>
                        </Box>
                    </Logo>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        margin: "40px auto 0",
                        maxWidth: "800px",
                        width: "100%",
                    }}
                /* className={classes.avtorstvo} */
                >
                    Avtorstvo
                </Button>
            </Box >
        </Box >
    )
}

export default Footer
