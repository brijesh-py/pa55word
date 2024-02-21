import { useState, useEffect, useCallback, useRef } from "react";

const Password = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const passwordRef = useRef();

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.classList.add("animate-ping");
    passwordRef.current?.classList.add("bg-green-600");
    document.body.classList.add("animate-pulse");
    navigator?.clipboard.writeText(password);
    setTimeout(() => {
      passwordRef.current?.classList.remove("animate-ping");
      document.body.classList.remove("animate-pulse");
      passwordRef.current?.classList.remove("bg-green-600");
    }, 500);
  });

  const generatePasswordBtn = useCallback(() => {
    let numbers = "1234567890";
    let specialCharacter = "@#$%^&*()+=[]{}?";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGQRSTUVWXYZ";
    let holdPassword = "";
    if (numbersAllowed) str += numbers;
    if (symbolsAllowed) str += specialCharacter;

    for (let i = 1; i <= passwordLength; i++) {
      holdPassword += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(holdPassword);
  }, [passwordLength, setPassword, symbolsAllowed, numbersAllowed]);

  useEffect(() => {
    generatePasswordBtn();
  }, [passwordLength, numbersAllowed, symbolsAllowed, generatePasswordBtn]);

  return (
    <>
      <div className="text-center py-3 bg-slate-800">
        <h1 className="text-slate-200 text-3xl uppercase font-bold">
          Generate Password
        </h1>
      </div>
      <div className="mx-auto w-[100%] grid place-items-center mt-12 h-[60vh]">
        <div className="w-[96%]  sm:w-[60%] md:w-[40%]">
          <div className="mx-auto">
            <div className="mb-2">
              <small
                className="text-slate-500
             text-sm uppercase"
              >
                generated password
              </small>
              <div
                className="bg-slate-900 flex justify-between
            items-center
            h-auto mt-1 "
              >
                <input
                  type="text"
                  name=""
                  id=""
                  className="bg-transparent outline-none
                   text-slate-300 inset-5 p-2 w-full"
                  value={password}
                  readOnly
                  ref={passwordRef}
                  onChange={generatePasswordBtn}
                />
                <button
                  onClick={copyPasswordToClipboard}
                  className="px-3 py-2 
              hover:bg-sky-700 cursor-pointer shadow hover:shadow-xl
               bg-sky-600 border border-slate-400
                text-slate-200"
                >
                  COPY
                </button>
              </div>
            </div>
            <div className="mb-2">
              <small className="text-slate-500 text-sm uppercase">
                Length: {passwordLength}
              </small>
              <div className="bg-slate-900 mt-1 px-3 py-2  overflow-hidden flex items-center justify-between">
                <small className="text-slate-300">8</small>
                <input
                  type="range"
                  name=""
                  id=""
                  className="bg-transparent outline-none indent-2 p-1  w-[90%] text-slate-300"
                  value={passwordLength}
                  min={8}
                  max={50}
                  onChange={(e) => setPasswordLength(e.target.value)}
                />
                <small className="text-slate-300">50</small>
              </div>
            </div>
            <div className="mb-2 uppercase">
              <small className="text-slate-500 text-sm uppercase">
                settings
              </small>
              <div className="bg-slate-900 flex justify-between items-center mt-1 py-2 px-3  overflow-hidden">
                <label
                  htmlFor="numbers"
                  className="text-slate-400 text-sm cursor-pointer"
                >
                  Include Numbers
                </label>
                <input
                  type="checkbox"
                  id="numbers"
                  className="bg-transparent cursor-pointer outline-none text-slate-300"
                  onChange={() => setNumbersAllowed((prev) => !prev)}
                />
              </div>
              <div className="bg-slate-900 flex justify-between items-center mt-1 py-2 px-3  overflow-hidden">
                <label
                  htmlFor="symbols"
                  className="text-slate-400 text-sm cursor-pointer"
                >
                  Include Symbols
                </label>
                <input
                  type="checkbox"
                  id="symbols"
                  className="bg-transparent cursor-pointer outline-none text-slate-300"
                  onChange={() => setSymbolsAllowed((prev) => !prev)}
                />
              </div>
              <div className="bg-slate-900 flex justify-between items-center mt-1 py-2 px-3 w-full mx-auto overflow-hidden">
                <button
                  title="Move Mouse Generate Password"
                  onMouseMoveCapture={() => generatePasswordBtn()}
                  className="bg-slate-800 block w-[80%] mx-auto py-2 text-slate-200 uppercase text-base border-slate-600 border shadow hover:shadow-xl hover:bg-slate-700 cursor-pointer"
                >
                  Generate Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-800 p-4 fixed bottom-0">
        <div className="text-center">
          <small className="text-slate-500 text-sm uppercase me-2">
            Made by
          </small>
          <a
            className="text-slate-100"
            href="https://github.com/brijesh-py"
            target="_blank"
            rel="noopener noreferrer"
          >
            BRIJESH GP
          </a>
        </div>
      </div>
    </>
  );
};
export default Password;
