import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import Login from '../components/Login';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Title = styled.div`
  font-weight: bold;
  font-size: 100px;
  text-align: center;
  position: absolute;
  color: black;
  border-radius: 1rem;
  left: 25%;
  font-family: 'Courier New', Courier, monospace;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
`;

export default function Mychat({ chatData, handleToView }: any) {
  console.log(chatData);
  const check = useSelector((state: RootState) => state.modal.check);
  const reverse = (data: any) => {
    console.log(data);
    handleToView({ nickname: data });
  };
  return (
    <div>
      <Title>
        <div> 쪽지 보관함</div>
      </Title>
      {chatData === null || chatData.data.length === 0 ? null : (
        <div>
          <div>
            {chatData.data.map((el: any) => {
              const source = el.source;
              return (
                <div>
                  <div>보낸 사람: {el.source}</div>
                  <div> 내용: {el.text}</div>
                  <Link to="/chat">
                    <button onClick={() => reverse(source)}>
                      {el.source}에게 답장하기
                    </button>{' '}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {check ? <Login /> : null}
    </div>
  );
}
