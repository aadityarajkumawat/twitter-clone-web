import styled from "styled-components";

export const EditProfileContainer = styled.div`
    width: 450px;
    height: 500px;
    background-color: #222;
    position: absolute;
    z-index: 4;
    left: 50%;
    transform: translate(-50%, -65%);
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BackDrop = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffffff60;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
`;

export const TransparentBackdrop = styled(BackDrop)`
    opacity: 0;
`;

export const EditProfileHeading = styled.div`
    width: 100%;
    padding: 15px;
    color: white;
    span {
        font-weight: 700;
    }
    display: flex;
    justify-content: space-between;
`;

export const CloseEditProfile = styled.div`
    width: 20px;
    height: 20px;
    background-color: #ff524f;
    border-radius: 100%;
    cursor: pointer;
`;

export const EditProfileForm = styled.form`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.div`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

export const LabelI = styled.div`
    color: white;
    font-weight: 700;
`;

export const InputI = styled.input`
    width: 100%;
    height: 40px;
    color: white;
    border: none;
    background-color: #222;
    border-bottom: 1px solid #fff;
    font-size: 17px;
`;

export const SubmitContainer = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const SubmitBtn = styled.button`
    width: 100px;
    height: 40px;
    border: none;
    color: #fff;
    background-color: #0066ff;
    align-self: flex-end;
    font-weight: 700;
`;

export const ImageInputWrapper = styled.div`
    width: 250px;
    height: 40px;
    background-color: #ffffff30;
    display: flex;
    justify-content: flex-start;
    position: relative;
    border-radius: 10px;
    margin-bottom: 8px;
    margin-top: 8px;
`;

export const PseudoLabel = styled.div`
    height: 40px;
    width: 200px;
    display: flex;
    align-items: center;
    color: white;
    padding: 10px;
`;

export const ImageInput = styled.input`
    height: 40px;
    width: 70px;
    border: none;
    opacity: 0;
`;

export const Icon = styled.div`
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 100%;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: #ccc;
`;

export const Progress = styled.div`
    width: 5px;
    height: 4px;
    background-color: #0066ff;
`;
export const WrapperBox = styled.div`
    position: relative;
    .mid {
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0;
        position: absolute;
        top: 0;
        z-index: 0;
    }
    input {
        top: 0;
        position: absolute;
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        z-index: 20;
        cursor: pointer;
    }

    input:hover + .mid {
        opacity: 0.5;
    }
`;
