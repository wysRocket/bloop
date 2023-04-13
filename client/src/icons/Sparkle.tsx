import IconWrapper from './Wrapper';

const RawIcon = (
  <svg viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.99793 2.15375C4.99793 3.99546 3.50492 5.48847 1.66321 5.48847C3.50492 5.48847 4.99793 6.98148 4.99793 8.82319M4.99793 2.15375C4.99793 3.99546 6.49094 5.48847 8.33265 5.48847C6.49094 5.48847 4.99793 6.98148 4.99793 8.82319M4.99793 2.15375V1.32007M4.99793 8.82319V9.65687M14.1684 12.1579C14.1684 9.85577 12.3022 7.98951 10 7.98951C12.3022 7.98951 14.1684 6.12326 14.1684 3.82111M14.1684 12.1579C14.1684 9.85577 16.0347 7.98951 18.3368 7.98951C16.0347 7.98951 14.1684 6.12326 14.1684 3.82111M14.1684 12.1579L14.1684 12.9916M14.1684 3.82111L14.1684 2.98743M8.33265 17.16V17.9937M8.33265 11.3242V10.4906M8.33265 10.9074C8.33265 12.7491 6.83965 14.2421 4.99793 14.2421C6.83965 14.2421 8.33265 15.7351 8.33265 17.5768C8.33265 15.7351 9.82566 14.2421 11.6674 14.2421C9.82566 14.2421 8.33265 12.7491 8.33265 10.9074Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BoxedIcon = (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.99793 3.15375C4.99793 4.99546 3.50492 6.48847 1.66321 6.48847C3.50492 6.48847 4.99793 7.98148 4.99793 9.82319M4.99793 3.15375C4.99793 4.99546 6.49094 6.48847 8.33265 6.48847C6.49094 6.48847 4.99793 7.98148 4.99793 9.82319M4.99793 3.15375V2.32007M4.99793 9.82319V10.6569M14.1684 13.1579C14.1684 10.8558 12.3022 8.98951 10 8.98951C12.3022 8.98951 14.1684 7.12326 14.1684 4.82111M14.1684 13.1579C14.1684 10.8558 16.0347 8.98951 18.3368 8.98951C16.0347 8.98951 14.1684 7.12326 14.1684 4.82111M14.1684 13.1579L14.1684 13.9916M14.1684 4.82111L14.1684 3.98743M8.33265 18.16V18.9937M8.33265 12.3242V11.4906M8.33265 11.9074C8.33265 13.7491 6.83965 15.2421 4.99793 15.2421C6.83965 15.2421 8.33265 16.7351 8.33265 18.5768C8.33265 16.7351 9.82566 15.2421 11.6674 15.2421C9.82566 15.2421 8.33265 13.7491 8.33265 11.9074Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconWrapper(RawIcon, BoxedIcon);