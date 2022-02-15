package com.tweetapp.mytweetapp.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
//@EnableWebMvc
public class SwaggerConfig {
	
	public static final String USER_CONT_TAG = "User Controller";
	public static final String TWEET_CONT_TAG = "Tweet Controller";

	@Bean
	public Docket api() {
		//System.out.println("Creating Swagger docket obj");
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.tweetapp.mytweetapp.controller"))
				.paths(PathSelectors.any())
				.build()
				.apiInfo(apiInfo());
				//.tags(new Tag(TWEET_APP_TAG, "Tweet App Tag"));
	}
	
	private ApiInfo apiInfo() {
	    return new ApiInfo(
	      "Tweet App REST API", 
	      "Tweet API documentation for developers.", 
	      "API Terms of Service", 
	      "Terms of service", 
	      new Contact("Vinay Kumar", "www.cognizant.com", "Vinay@cognizant.com"), 
	      "License of API", "API license URL", Collections.emptyList());
	}
}
