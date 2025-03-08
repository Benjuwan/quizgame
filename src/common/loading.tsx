import styled from "styled-components";

export const Loading = () => {
    return (
        <LoadingElm>
            <p>Data Loading</p>
        </LoadingElm>
    );
}

const LoadingElm = styled.div`
    display: grid;
    place-content: center;
    height: calc(100vh/2);

    & p {
        text-align: center;
    }
`