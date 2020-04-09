import React from 'react';

interface FooterProps {
  footer: string;
  copyright: string;
  colorGoldLocal: string;
  complexProp:{
    [categories:string]:{
      size:string;
      color?:string;
    }
  };
}

// export const Footer: FC<FooterProps> = ({ footer,copyright,colorGoldLocal }) => {
// function Footer({ footer,copyright,colorGoldLocal }: FooterProps) {
// export const Footer = ({ footer,copyright,colorGoldLocal }: FooterProps) => {
// export default Footer;

export const Footer = ({ footer,copyright,colorGoldLocal }: FooterProps) => {
  return (
    <div className={footer}>
      <div className="container h-100">
        <div className={`h-100 d-flex flex-column justify-content-center align-items-center ${copyright}`}>
          <div>Copyright &copy; {new Date().getFullYear()} · Election App {new Date().getFullYear()}</div>
          <div><span className={`fas fa-headphones fa-padding ${colorGoldLocal}`}></span><span className={`font-norwester ${colorGoldLocal}`}>Footer Headphones</span></div>
          <div>Don't Forget To Vote!</div>
        </div>
      </div>
    </div>
  );
}