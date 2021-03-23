import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    * {
        box-sizing:border-box;
    }
    body {
        padding-top: 4rem;
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.blackColor};
        line-height: 1.2;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        &::-webkit-scrollbar {
		display : 'none'
        }
    }
    a {
        color:${(props) => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
`;
