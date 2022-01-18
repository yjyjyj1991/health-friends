package com.healthfriend.healthfriend.util.mail;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMailHelper {
  private static SendMailHelper instance = null;

  private String sendMailId = null;
  private String sendMailPassword = null;
  private Properties prop = null;
  private Session session = null;

  public static SendMailHelper getInstance() {
    if (instance == null) {
      instance = new SendMailHelper();
    }

    return instance;
  }

  private SendMailHelper() {
    initAccount();
    initProperties();
    initSession();
  }

  private void initAccount() {
    this.sendMailId = "sh.kim7141";
    this.sendMailPassword = "1q2w3e4r!@";
  }

  private void initProperties() {
    prop = new Properties();
    prop.put("mail.smtp.host", "smtp.gmail.com");
    prop.put("mail.smtp.port", 465);
    prop.put("mail.smtp.auth", "true");
    prop.put("mail.smtp.ssl.enable", "true");
    prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
  }

  private void initSession() {
    session = Session.getInstance(prop, new Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(sendMailId, sendMailPassword);
      }
    });
  }

  public boolean SendMail(String toAddress, String tmpPassword) {
    boolean isSuccess;

    try {
      MimeMessage msg = new MimeMessage(session);
      msg.setFrom(new InternetAddress(sendMailId, "HEALTH FRIEND"));

      msg.addRecipient(Message.RecipientType.TO, new InternetAddress(toAddress));

      msg.setSubject(String.format("HEALTH FRIEND %s", tmpPassword.length() == 5 ? "인증 값 입니다." : "임시 비밀번호입니다."));
      msg.setText(String.format("%s %s", tmpPassword.length() == 5 ? "인증 값" : "임시 비밀번호", tmpPassword));

      Transport.send(msg);

      System.out.println("전송");
      isSuccess = true;
    } catch (Exception ex) {
      System.out.println(ex.getMessage());
      isSuccess = false;
    }

    return isSuccess;
  }
}
