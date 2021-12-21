-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema desafio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema desafio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `desafio` DEFAULT CHARACTER SET utf8 ;
USE `desafio` ;

-- -----------------------------------------------------
-- Table `desafio`.`USUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio`.`USUARIO` (
  `CPF` CHAR(12) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `endereco` VARCHAR(50) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`CPF`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `desafio`.`LIVRO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio`.`LIVRO` (
  `idLIVRO` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(50) NOT NULL,
  `autor` VARCHAR(50) NOT NULL,
  `USUARIO_CPF` CHAR(12) NOT NULL,
  PRIMARY KEY (`idLIVRO`),
  INDEX `fk_LIVRO_USUARIO1_idx` (`USUARIO_CPF` ASC) VISIBLE,
  CONSTRAINT `fk_LIVRO_USUARIO1`
    FOREIGN KEY (`USUARIO_CPF`)
    REFERENCES `desafio`.`USUARIO` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `desafio`.`EMPRESTIMO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio`.`EMPRESTIMO` (
  `idEMPRESTIMO` INT NOT NULL AUTO_INCREMENT,
  `retirada` DATETIME NOT NULL,
  `devolucao` DATETIME NOT NULL,
  `USUARIO_CPF` CHAR(12) NOT NULL,
  PRIMARY KEY (`idEMPRESTIMO`),
  INDEX `fk_EMPRESTIMO_USUARIO1_idx` (`USUARIO_CPF` ASC) VISIBLE,
  CONSTRAINT `fk_EMPRESTIMO_USUARIO1`
    FOREIGN KEY (`USUARIO_CPF`)
    REFERENCES `desafio`.`USUARIO` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `desafio`.`EMPRESTIMO_LIVRO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio`.`EMPRESTIMO_LIVRO` (
  `EMPRESTIMO_idEMPRESTIMO` INT NOT NULL,
  `LIVRO_idLIVRO` INT NOT NULL,
  PRIMARY KEY (`EMPRESTIMO_idEMPRESTIMO`, `LIVRO_idLIVRO`),
  INDEX `fk_EMPRESTIMO_has_LIVRO_LIVRO1_idx` (`LIVRO_idLIVRO` ASC) VISIBLE,
  INDEX `fk_EMPRESTIMO_has_LIVRO_EMPRESTIMO1_idx` (`EMPRESTIMO_idEMPRESTIMO` ASC) VISIBLE,
  CONSTRAINT `fk_EMPRESTIMO_has_LIVRO_EMPRESTIMO1`
    FOREIGN KEY (`EMPRESTIMO_idEMPRESTIMO`)
    REFERENCES `desafio`.`EMPRESTIMO` (`idEMPRESTIMO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPRESTIMO_has_LIVRO_LIVRO1`
    FOREIGN KEY (`LIVRO_idLIVRO`)
    REFERENCES `desafio`.`LIVRO` (`idLIVRO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
