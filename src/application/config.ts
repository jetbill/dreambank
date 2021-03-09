import express from "express";
import morgan from 'morgan';
import cors from "cors";
import bodyParser from "body-parser";

export class Config {

  constructor() {
    this.setMorgan();
    
  }

  public setMorgan() {
    morgan('dev');

  }



}

