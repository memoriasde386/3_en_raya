window.addEventListener("load", function ()
{
	var fichas_movibles_o_fijas=sessionStorage.getItem('session_storsge_modalidad_de_juego');	
	var humano_contra_maquina_o_humano=sessionStorage.getItem('session_storsge_humano_contra');
	var quien_empieza_humano_o_maquina=sessionStorage.getItem('session_storsge_quien_empieza_maquina_o_humano');
	var quien_empieza_las_equis_o_los_circulos=sessionStorage.getItem('session_storsge_quien_empieza_equis_o_circulos');
	var nivel_de_dificultad_entre_0_y_4=sessionStorage.getItem('session_storsge_nivel_de_dificultad');

	var aleatorio_inteligencia_fichas_movibles;
	var el_ordenador_juega_con;
	var juego_terminado=false;
	var casillas = ["v", "v", "v", "v", "v", "v", "v", "v", "v"];
	var movimientos_posibles_fichas_movibles = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
	var teclapulsada=9;
	var teclapulsada_de_origen; 
	var turno=0;	
	var posicion;
	var movimiento;
	var hay_empate_o_quien_ha_ganado;
	var estado_de_fichas_movibles;
	
	var div_1 = document.querySelector('#div1');
	var div_2 = document.querySelector('#div2');
	var div_3 = document.querySelector('#div3');
	var div_4 = document.querySelector('#div4');
	var div_5 = document.querySelector('#div5');
	var div_6 = document.querySelector('#div6');
	var div_7 = document.querySelector('#div7');
	var div_8 = document.querySelector('#div8');
	var div_9 = document.querySelector('#div9');

	if (humano_contra_maquina_o_humano=="maquina")
	{
		if (quien_empieza_las_equis_o_los_circulos=="circulos")
		{
			if (quien_empieza_humano_o_maquina=="maquina") el_ordenador_juega_con="circulos";
			else if (quien_empieza_humano_o_maquina=="humano") el_ordenador_juega_con="equis";
		}		
		else if (quien_empieza_las_equis_o_los_circulos=="equis")
		{
			if (quien_empieza_humano_o_maquina=="maquina") el_ordenador_juega_con="equis";
			else if (quien_empieza_humano_o_maquina=="humano") el_ordenador_juega_con="circulos";
		}	
	}

	if (fichas_movibles_o_fijas=="fijas") document.body.style.backgroundImage = "url('imagenes/giralda.jpg')";
	else if (fichas_movibles_o_fijas=="movibles") document.body.style.backgroundImage = "url('imagenes/giralda_asterisco_negro.jpg')";

	funcion_unificada();

	function funcion_unificada()
	{	
		if (fichas_movibles_o_fijas=="fijas" && turno<9)
		{			
			if (humano_contra_maquina_o_humano=="maquina")
			{
				if (quien_empieza_humano_o_maquina=="maquina")
				{
					if (quien_empieza_las_equis_o_los_circulos=="equis") funcion_fijas_contra_maquina_empieza_maquina_equis();
					else if (quien_empieza_las_equis_o_los_circulos=="circulos") funcion_fijas_contra_maquina_empieza_maquina_circulos();
				}
				else if (quien_empieza_humano_o_maquina=="humano")
				{
					if (quien_empieza_las_equis_o_los_circulos=="equis") funcion_fijas_contra_maquina_empieza_humano_equis();
					else if (quien_empieza_las_equis_o_los_circulos=="circulos") funcion_fijas_contra_maquina_empieza_humano_circulos();
				}
			}
			else if (humano_contra_maquina_o_humano=="humano")
			{
				if (quien_empieza_las_equis_o_los_circulos=="equis") funcion_fijas_contra_humano_equis();
				else if (quien_empieza_las_equis_o_los_circulos=="circulos") funcion_fijas_contra_humano_circulos();	
			}
		}
		else if (fichas_movibles_o_fijas=="movibles")
		{
			if (humano_contra_maquina_o_humano=="maquina")
			{
				if (quien_empieza_humano_o_maquina=="maquina")
				{
					if (quien_empieza_las_equis_o_los_circulos=="equis") funcion_movibles_contra_maquina_empieza_maquina_equis();
					else if (quien_empieza_las_equis_o_los_circulos=="circulos") funcion_movibles_contra_maquina_empieza_maquina_circulos();
				}
				else if (quien_empieza_humano_o_maquina=="humano")
				{
					if (quien_empieza_las_equis_o_los_circulos=="equis") funcion_movibles_contra_maquina_empieza_humano_equis();
					else if (quien_empieza_las_equis_o_los_circulos=="circulos") funcion_movibles_contra_maquina_empieza_humano_circulos();
				}
			}
			else if (humano_contra_maquina_o_humano=="humano")
			{
				if (quien_empieza_las_equis_o_los_circulos=="equis") funcion_movibles_contra_humano_equis();
				else if (quien_empieza_las_equis_o_los_circulos=="circulos") funcion_movibles_contra_humano_circulos();	
			}
		}	
	}

	function funcion_fijas_contra_maquina_empieza_maquina_equis()
	{		
		if (turno==0)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
		}	
		else if (turno==1) juega_humano_fichas_fijas();
		else if (turno==2)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;			
		}
		else if (turno==3) juega_humano_fichas_fijas();
		else if (turno==4)
		{
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;								
		}
		else if (turno==5)
		{
			juega_humano_fichas_fijas();		
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==6)
		{
			if (nivel_de_dificultad_entre_0_y_4>3) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;							
		}
		else if (turno==7)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==8)
		{
			if (nivel_de_dificultad_entre_0_y_4>4) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
			alguien_ha_ganado_o_hay_empate();						
		}
	}

	function funcion_fijas_contra_maquina_empieza_maquina_circulos()
	{
		if (turno==0)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
		}	
		else if (turno==1) juega_humano_fichas_fijas();
		else if (turno==2)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;			
		}
		else if (turno==3) juega_humano_fichas_fijas();
		else if (turno==4)
		{
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;								
		}
		else if (turno==5)
		{
			juega_humano_fichas_fijas();			
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==6)
		{
			if (nivel_de_dificultad_entre_0_y_4>3) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;							
		}
		else if (turno==7)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==8)
		{
			if (nivel_de_dificultad_entre_0_y_4>4) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
			alguien_ha_ganado_o_hay_empate();						
		}
	}

	function funcion_fijas_contra_maquina_empieza_humano_equis()
	{
		if (turno==0) juega_humano_fichas_fijas();
		else if (turno==1)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();			
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
		}	
		else if (turno==2) juega_humano_fichas_fijas();
		else if (turno==3)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;			
		}
		else if (turno==4)
		{
			juega_humano_fichas_fijas();		
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}		
		else if (turno==5)
		{
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;								
		}
		else if (turno==6)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==7)
		{
			if (nivel_de_dificultad_entre_0_y_4>3) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;							
		}
		else if (turno==8)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;					
		}
	}

	function funcion_fijas_contra_maquina_empieza_humano_circulos()
	{
		if (turno==0) juega_humano_fichas_fijas();
		else if (turno==1)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();			
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
		}	
		else if (turno==2) juega_humano_fichas_fijas();
		else if (turno==3)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;			
		}
		else if (turno==4)
		{
			juega_humano_fichas_fijas();		
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}		
		else if (turno==5)
		{
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;								
		}
		else if (turno==6)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==7)
		{
			if (nivel_de_dificultad_entre_0_y_4>3) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;							
		}
		else if (turno==8)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;					
		}
	}

	function funcion_fijas_contra_humano_equis()
	{		
		if (turno==0)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==1)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==2)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==3)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==4)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}		
		else if (turno==5)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;								
		}
		else if (turno==6)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==7)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;						
		}
		else if (turno==8)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;					
		}
	}

	function juega_humano_fichas_fijas()
	{
		if (el_ordenador_juega_con=="equis")
		{
			if (turno!=0)
			{
				if (casillas[teclapulsada]!="v") alert("Esta casilla ya está ocupada, por favor escoge otra");		
				else
				{	
					poner_o(teclapulsada);		
					casillas[teclapulsada]="o";				
					turno++;
					if (humano_contra_maquina_o_humano=="maquina") funcion_unificada();
				}
			}
			else
			{
				if (teclapulsada!=9)
				{
					poner_o(teclapulsada);						
					casillas[teclapulsada]="o";				
					turno++;
					if (humano_contra_maquina_o_humano=="maquina") funcion_unificada();
				}
			}
		}
		else if (el_ordenador_juega_con=="circulos")
		{
			if (turno!=0)
			{
				if (casillas[teclapulsada]!="v") alert("Esta casilla ya está ocupada, por favor escoge otra");		
				else
				{	
					poner_x(teclapulsada);		
					casillas[teclapulsada]="x";				
					turno++;
					if (humano_contra_maquina_o_humano=="maquina") funcion_unificada();
				}
			}
			else
			{
				if  (teclapulsada!=9)
				{
					poner_x(teclapulsada);						
					casillas[teclapulsada]="x";				
					turno++;
					if (humano_contra_maquina_o_humano=="maquina") funcion_unificada();
				}
			}			
		}	
	}

	function funcion_fijas_contra_humano_circulos()
	{
		if (turno==0)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==1)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==2)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==3)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==4)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}		
		else if (turno==5)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;								
		}
		else if (turno==6)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;
		}
		else if (turno==7)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;						
		}
		else if (turno==8)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=9;					
		}
	}

	function funcion_movibles_contra_maquina_empieza_maquina_equis()
	{
		if (turno==0)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
		}	
		else if (turno==1) juega_humano_fichas_fijas();
		else if (turno==2)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;			
		}
		else if (turno==3) juega_humano_fichas_fijas();
		else if (turno==4)
		{
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;								
		}
		else if (turno==5)
		{
			estado_de_fichas_movibles="x";
			juega_humano_fichas_fijas();	
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;			
			
		}
		else if (turno>5 && alguien_ha_ganado_o_hay_empate()!="terminado")
		{
			aleatorio_inteligencia_fichas_movibles=Math.floor(Math.random()*4);

			if (estado_de_fichas_movibles=="x")
			{
				if (nivel_de_dificultad_entre_0_y_4==0) movimiento=posicion_aleatoria_fichas_movibles();
				else if (nivel_de_dificultad_entre_0_y_4==1)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==2)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==3)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==4) movimiento=posicion_inteligente_fichas_movibles();

				if (nivel_de_dificultad_entre_0_y_4>3) movimiento=posicion_inteligente_fichas_movibles();
				else movimiento=posicion_aleatoria_fichas_movibles();

				borrar(movimiento[0]);
				casillas[movimiento[0]]="v";
				poner_x(movimiento[1]);
				casillas[movimiento[1]]="x";			
				turno++;
				estado_de_fichas_movibles="humano_fase_1";
			}
			else if (estado_de_fichas_movibles=="humano_fase_1" && alguien_ha_ganado_o_hay_empate()!="terminado") humano_fase_1_fichas_movibles();
			else if (estado_de_fichas_movibles=="humano_fase_2")
			{
				humano_fase_2_fichas_movibles();
				alguien_ha_ganado_o_hay_empate();
			}
		}
	}

	function funcion_movibles_contra_maquina_empieza_maquina_circulos()
	{
		if (turno==0)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
		}	
		else if (turno==1) juega_humano_fichas_fijas();
		else if (turno==2)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;			
		}
		else if (turno==3) juega_humano_fichas_fijas();
		else if (turno==4)
		{
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;								
		}
		else if (turno==5)
		{
			estado_de_fichas_movibles="o";
			juega_humano_fichas_fijas();	
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;			
			
		}
		else if (turno>5 && alguien_ha_ganado_o_hay_empate()!="terminado")
		{
			aleatorio_inteligencia_fichas_movibles=Math.floor(Math.random()*4);

			if (estado_de_fichas_movibles=="o")
			{
				if (nivel_de_dificultad_entre_0_y_4==0) movimiento=posicion_aleatoria_fichas_movibles();
				else if (nivel_de_dificultad_entre_0_y_4==1)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==2)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==3)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==4) movimiento=posicion_inteligente_fichas_movibles();

				if (nivel_de_dificultad_entre_0_y_4>3) movimiento=posicion_inteligente_fichas_movibles();
				else movimiento=posicion_aleatoria_fichas_movibles();

				borrar(movimiento[0]);
				casillas[movimiento[0]]="v";
				poner_o(movimiento[1]);
				casillas[movimiento[1]]="o";			
				turno++;
				estado_de_fichas_movibles="humano_fase_1";
			}
			else if (estado_de_fichas_movibles=="humano_fase_1" && alguien_ha_ganado_o_hay_empate()!="terminado") humano_fase_1_fichas_movibles();
			else if (estado_de_fichas_movibles=="humano_fase_2")
			{
				humano_fase_2_fichas_movibles();
				alguien_ha_ganado_o_hay_empate();
			}
		}
	}

	function funcion_movibles_contra_maquina_empieza_humano_equis()
	{
		if (turno==0) juega_humano_fichas_fijas();
		else if (turno==1)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
		}
		else if (turno==2) juega_humano_fichas_fijas();
		else if (turno==3)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;			
		}
		else if (turno==4)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;
		}
		else if (turno==5)
		{
			estado_de_fichas_movibles="humano_fase_1";
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_o(posicion);
			casillas[posicion]="o";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;							
		}
		else if (turno>5 && alguien_ha_ganado_o_hay_empate()!="terminado")
		{
			aleatorio_inteligencia_fichas_movibles=Math.floor(Math.random()*4);

			if (estado_de_fichas_movibles=="o")
			{
				if (nivel_de_dificultad_entre_0_y_4==0) movimiento=posicion_aleatoria_fichas_movibles();
				else if (nivel_de_dificultad_entre_0_y_4==1)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==2)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==3)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==4) movimiento=posicion_inteligente_fichas_movibles();

				if (nivel_de_dificultad_entre_0_y_4>3) movimiento=posicion_inteligente_fichas_movibles();
				else movimiento=posicion_aleatoria_fichas_movibles();

				borrar(movimiento[0]);
				casillas[movimiento[0]]="v";
				poner_o(movimiento[1]);
				casillas[movimiento[1]]="o";			
				turno++;
				estado_de_fichas_movibles="humano_fase_1";
			}
			else if (estado_de_fichas_movibles=="humano_fase_1" && alguien_ha_ganado_o_hay_empate()!="terminado") humano_fase_1_fichas_movibles();
			else if (estado_de_fichas_movibles=="humano_fase_2")
			{
				humano_fase_2_fichas_movibles();
				alguien_ha_ganado_o_hay_empate();
			}
		}
	}

	function funcion_movibles_contra_maquina_empieza_humano_circulos()
	{
		if (turno==0) juega_humano_fichas_fijas();
		else if (turno==1)
		{
			if (nivel_de_dificultad_entre_0_y_4>0) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
		}
		else if (turno==2) juega_humano_fichas_fijas();
		else if (turno==3)
		{
			if (nivel_de_dificultad_entre_0_y_4>1) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;			
		}
		else if (turno==4)
		{
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;
		}
		else if (turno==5)
		{
			estado_de_fichas_movibles="humano_fase_1";
			if (nivel_de_dificultad_entre_0_y_4>2) posicion=posicion_inteligente_fichas_fijas();
			else posicion=posicion_aleatoria_fichas_fijas();
			poner_x(posicion);
			casillas[posicion]="x";			
			turno++;
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;							
		}
		else if (turno>5 && alguien_ha_ganado_o_hay_empate()!="terminado")
		{
			aleatorio_inteligencia_fichas_movibles=Math.floor(Math.random()*4);

			if (estado_de_fichas_movibles=="x")
			{
				if (nivel_de_dificultad_entre_0_y_4==0) movimiento=posicion_aleatoria_fichas_movibles();
				else if (nivel_de_dificultad_entre_0_y_4==1)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==2)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==3)
				{
					if (aleatorio_inteligencia_fichas_movibles==0) movimiento=posicion_aleatoria_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==1) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==2) movimiento=posicion_inteligente_fichas_movibles();
					else if (aleatorio_inteligencia_fichas_movibles==3)	movimiento=posicion_inteligente_fichas_movibles();
				}
				else if (nivel_de_dificultad_entre_0_y_4==4) movimiento=posicion_inteligente_fichas_movibles();

				if (nivel_de_dificultad_entre_0_y_4>3) movimiento=posicion_inteligente_fichas_movibles();
				else movimiento=posicion_aleatoria_fichas_movibles();

				borrar(movimiento[0]);
				casillas[movimiento[0]]="v";
				poner_x(movimiento[1]);
				casillas[movimiento[1]]="x";			
				turno++;
				estado_de_fichas_movibles="humano_fase_1";
			}
			else if (estado_de_fichas_movibles=="humano_fase_1" && alguien_ha_ganado_o_hay_empate()!="terminado") humano_fase_1_fichas_movibles();
			else if (estado_de_fichas_movibles=="humano_fase_2")
			{
				humano_fase_2_fichas_movibles();
				alguien_ha_ganado_o_hay_empate();
			}
		}
	}

	function funcion_movibles_contra_humano_equis()
	{
		if (turno==0)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==1)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==2)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==3)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==4)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;
		}		
		else if (turno==5)
		{
			estado_de_fichas_movibles="humano_fase_1";
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
			el_ordenador_juega_con="circulos";
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;								
		}
		else if (turno>5 && alguien_ha_ganado_o_hay_empate()!="terminado")
		{
			if (estado_de_fichas_movibles=="humano_fase_1" && alguien_ha_ganado_o_hay_empate()!="terminado") humano_fase_1_fichas_movibles_humano();
			else if (estado_de_fichas_movibles=="humano_fase_2")
			{
				humano_fase_2_fichas_movibles_humano();
				alguien_ha_ganado_o_hay_empate();
				turno++;
			}			
		}
	}

	function humano_fase_1_fichas_movibles_humano()
	{
		if (casillas[teclapulsada]=="v") alert("Esta casilla está vacía y por tanto no puedes selecionarla para moverla");
		else
		{
			if (el_ordenador_juega_con=="equis")
			{
				if (casillas[teclapulsada]=="x") alert("Esta casilla contiene una «x» y no puedes seleccionarla porque tú juegas con las o");		
				else if (casillas[teclapulsada]=="o")
				{
					if (puedo_mover_mi_ficha_movible()==true)
					{
						poner_o_verde(teclapulsada);
						humano_promocion_de_fase_1_a_fase_2();
					}
					else alert("La casilla selecionada contiene una de sus fichas pero esta no tiene opción a moverse, por favor escoja otra");
				}
			}
			else if (el_ordenador_juega_con=="circulos")
			{
				if (casillas[teclapulsada]=="o") alert("Esta casilla contiene una «o» y no puedes seleccionarla porque tú juegas con las x");		
				else if (casillas[teclapulsada]=="x")
				{
					if (puedo_mover_mi_ficha_movible()==true)
					{
						poner_x_verde(teclapulsada);
						humano_promocion_de_fase_1_a_fase_2();
					}
					else alert("La casilla selecionada contiene una de sus fichas pero esta no tiene opción a moverse, por favor escoja otra");
				}
			}
		}
	}

	function funcion_movibles_contra_humano_circulos()
	{
		if (turno==0)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==1)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==2)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
		} 
		else if (turno==3)
		{
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
		} 
		else if (turno==4)
		{
			el_ordenador_juega_con="equis";
			juega_humano_fichas_fijas();
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;
		}		
		else if (turno==5)
		{
			estado_de_fichas_movibles="humano_fase_1";
			el_ordenador_juega_con="circulos";
			juega_humano_fichas_fijas();
			el_ordenador_juega_con="equis";
			if (alguien_ha_ganado_o_hay_empate()=="terminado") turno=6;								
		}
		else if (turno>5 && alguien_ha_ganado_o_hay_empate()!="terminado")
		{
			if (estado_de_fichas_movibles=="humano_fase_1" && alguien_ha_ganado_o_hay_empate()!="terminado") humano_fase_1_fichas_movibles_humano();
			else if (estado_de_fichas_movibles=="humano_fase_2")
			{
				humano_fase_2_fichas_movibles_humano();
				alguien_ha_ganado_o_hay_empate();
				turno++;
			}			
		}
	}

	div_1.onclick = function ()
	{
		if(juego_terminado==false)
		{
			teclapulsada=0;
			funcion_unificada();
		}
	}

	div_2.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=1;
			funcion_unificada();
		}
	}

	div_3.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=2;
			funcion_unificada();
		}
	}

	div_4.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=3;
			funcion_unificada();
		}
	}

	div_5.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=4;
			funcion_unificada();
		}
	}

	div_6.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=5;
			funcion_unificada();
		}
	}

	div_7.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=6;
			funcion_unificada();
		}
	}

	div_8.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=7;
			funcion_unificada();
		}
	}

	div_9.onclick = function ()
	{	
		if(juego_terminado==false)
		{
			teclapulsada=8;
			funcion_unificada();
		}
	}

	function humano_fase_1_fichas_movibles()
	{
		if (el_ordenador_juega_con=="equis")
		{
			if (casillas[teclapulsada]=="x") alert("Esta casilla contiene una «x» y no puedes seleccionarla porque tú juegas con las o");			
			else if (casillas[teclapulsada]=="v") alert("Esta casilla está vacía y por tanto no puedes selecionarla para moverla");			
			else if (casillas[teclapulsada]=="o")
			{
				if (puedo_mover_mi_ficha_movible()==true)
				{
					poner_o_verde(teclapulsada);
					humano_promocion_de_fase_1_a_fase_2();
				}
				else alert("La casilla selecionada contiene una de sus fichas pero esta no tiene opción a moverse, por favor escoja otra");
			}
		}
		else if (el_ordenador_juega_con=="circulos")
		{
			if (casillas[teclapulsada]=="o") alert("Esta casilla contiene una «o» y no puedes seleccionarla porque tú juegas con las x");			
			else if (casillas[teclapulsada]=="v") alert("Esta casilla está vacía y por tanto no puedes selecionarla para moverla");			
			else if (casillas[teclapulsada]=="x")
			{
				if (puedo_mover_mi_ficha_movible()==true)
				{
					poner_x_verde(teclapulsada);
					humano_promocion_de_fase_1_a_fase_2();
				}
				else alert("La casilla selecionada contiene una de sus fichas pero esta no tiene opción a moverse, por favor escoja otra");				

			} 
		}
	}


	function humano_promocion_de_fase_1_a_fase_2()
	{
		estado_de_fichas_movibles="humano_fase_2";			
		casillas[teclapulsada]="v";	
		teclapulsada_de_origen=teclapulsada;		
	}

	function borrar_y_poner_o()
	{
		borrar(teclapulsada_de_origen);
		poner_o(teclapulsada);
		casillas[teclapulsada_de_origen]="v";
		casillas[teclapulsada]="o";
		estado_de_fichas_movibles="x";
		funcion_unificada();
	}

	function borrar_y_poner_o_humano()
	{
		borrar(teclapulsada_de_origen);
		poner_o(teclapulsada);
		casillas[teclapulsada_de_origen]="v";
		casillas[teclapulsada]="o";
		estado_de_fichas_movibles="humano_fase_1";
		cambio_ordenador_juega();
	}

	function cambio_ordenador_juega()
	{
		if (el_ordenador_juega_con=="equis") el_ordenador_juega_con="circulos";			
		else if (el_ordenador_juega_con=="circulos") el_ordenador_juega_con="equis";
	}

	function borrar_y_poner_x()
	{
		borrar(teclapulsada_de_origen);
		poner_x(teclapulsada);
		casillas[teclapulsada_de_origen]="v";
		casillas[teclapulsada]="x";
		estado_de_fichas_movibles="o";
		funcion_unificada();
	}

	function borrar_y_poner_x_humano()
	{
		borrar(teclapulsada_de_origen);
		poner_x(teclapulsada);
		casillas[teclapulsada_de_origen]="v";
		casillas[teclapulsada]="x";
		estado_de_fichas_movibles="humano_fase_1";
		cambio_ordenador_juega();
	}

	function humano_fase_2_fichas_movibles_humano()
	{
		if (casillas[teclapulsada]!="v") alert("Esa casilla está ocupada, por favor escoge otra");
		else if (teclapulsada==teclapulsada_de_origen) alert("Esa casilla es la misma que ya has seleccionado como origen, por favor escoge otra como destino");
		else
		{
			if (el_ordenador_juega_con=="equis")
			{
				if (teclapulsada_de_origen==0)
				{
					if (teclapulsada==1 || teclapulsada==4 || teclapulsada==3) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==1)
				{
					if (teclapulsada==2 || teclapulsada==4 || teclapulsada==0) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==2)
				{
					if (teclapulsada==5|| teclapulsada==4 || teclapulsada==1) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==3)
				{
					if (teclapulsada==0|| teclapulsada==4 || teclapulsada==6) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==4) borrar_y_poner_o_humano();
				else if (teclapulsada_de_origen==5)
				{
					if (teclapulsada==8|| teclapulsada==4 || teclapulsada==2) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==6)
				{
					if (teclapulsada==3|| teclapulsada==4 || teclapulsada==7) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==7)
				{
					if (teclapulsada==6|| teclapulsada==4 || teclapulsada==8) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==8)
				{
					if (teclapulsada==7|| teclapulsada==4 || teclapulsada==5) borrar_y_poner_o_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
			}
			else if (el_ordenador_juega_con=="circulos")
			{
				if (teclapulsada_de_origen==0)
				{
					if (teclapulsada==1 || teclapulsada==4 || teclapulsada==3) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==1)
				{
					if (teclapulsada==2 || teclapulsada==4 || teclapulsada==0) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==2)
				{
					if (teclapulsada==5|| teclapulsada==4 || teclapulsada==1) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==3)
				{
					if (teclapulsada==0|| teclapulsada==4 || teclapulsada==6) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==4) borrar_y_poner_x_humano();
				else if (teclapulsada_de_origen==5)
				{
					if (teclapulsada==8|| teclapulsada==4 || teclapulsada==2) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==6)
				{
					if (teclapulsada==3|| teclapulsada==4 || teclapulsada==7) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==7)
				{
					if (teclapulsada==6|| teclapulsada==4 || teclapulsada==8) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==8)
				{
					if (teclapulsada==7|| teclapulsada==4 || teclapulsada==5) borrar_y_poner_x_humano();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
			}			
		}
	}	

	function humano_fase_2_fichas_movibles()
	{
		if (casillas[teclapulsada]!="v") alert("Esa casilla está ocupada, por favor escoge otra");
		else if (teclapulsada==teclapulsada_de_origen) alert("Esa casilla es la misma que ya has seleccionado como origen, por favor escoge otra como destino");
		else
		{
			if (el_ordenador_juega_con=="equis")
			{
				if (teclapulsada_de_origen==0)
				{
					if (teclapulsada==1 || teclapulsada==4 || teclapulsada==3) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==1)
				{
					if (teclapulsada==2 || teclapulsada==4 || teclapulsada==0) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==2)
				{
					if (teclapulsada==5|| teclapulsada==4 || teclapulsada==1) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==3)
				{
					if (teclapulsada==0|| teclapulsada==4 || teclapulsada==6) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==4) borrar_y_poner_o();
				else if (teclapulsada_de_origen==5)
				{
					if (teclapulsada==8|| teclapulsada==4 || teclapulsada==2) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==6)
				{
					if (teclapulsada==3|| teclapulsada==4 || teclapulsada==7) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==7)
				{
					if (teclapulsada==6|| teclapulsada==4 || teclapulsada==8) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==8)
				{
					if (teclapulsada==7|| teclapulsada==4 || teclapulsada==5) borrar_y_poner_o();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
			}
			else if (el_ordenador_juega_con=="circulos")
			{
				if (teclapulsada_de_origen==0)
				{
					if (teclapulsada==1 || teclapulsada==4 || teclapulsada==3) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==1)
				{
					if (teclapulsada==2 || teclapulsada==4 || teclapulsada==0) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==2)
				{
					if (teclapulsada==5|| teclapulsada==4 || teclapulsada==1) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==3)
				{
					if (teclapulsada==0|| teclapulsada==4 || teclapulsada==6) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==4) borrar_y_poner_x();
				else if (teclapulsada_de_origen==5)
				{
					if (teclapulsada==8|| teclapulsada==4 || teclapulsada==2) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==6)
				{
					if (teclapulsada==3|| teclapulsada==4 || teclapulsada==7) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==7)
				{
					if (teclapulsada==6|| teclapulsada==4 || teclapulsada==8) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
				else if (teclapulsada_de_origen==8)
				{
					if (teclapulsada==7|| teclapulsada==4 || teclapulsada==5) borrar_y_poner_x();
					else alert("La casilla selecionada no es alcanzable desde tu casilla de origen");
				}
			}			
		}
	}



	function alguien_ha_ganado_o_hay_empate()
	{
		if (juego_terminado==false)
		{

		var cont=0;
		var cont2=0;

		hay_empate_o_quien_ha_ganado="empate";

		if (casillas[0]=="x" && casillas[1]=="x" && casillas[2]=="x") hay_empate_o_quien_ha_ganado="x";
		if (casillas[3]=="x" && casillas[4]=="x" && casillas[5]=="x") hay_empate_o_quien_ha_ganado="x";
		if (casillas[6]=="x" && casillas[7]=="x" && casillas[8]=="x") hay_empate_o_quien_ha_ganado="x";

		if (casillas[0]=="x" && casillas[3]=="x" && casillas[6]=="x") hay_empate_o_quien_ha_ganado="x";
		if (casillas[1]=="x" && casillas[4]=="x" && casillas[7]=="x") hay_empate_o_quien_ha_ganado="x";
		if (casillas[2]=="x" && casillas[5]=="x" && casillas[8]=="x") hay_empate_o_quien_ha_ganado="x";

		if (casillas[0]=="x" && casillas[4]=="x" && casillas[8]=="x") hay_empate_o_quien_ha_ganado="x";
		if (casillas[6]=="x" && casillas[4]=="x" && casillas[2]=="x") hay_empate_o_quien_ha_ganado="x";

		if (casillas[0]=="o" && casillas[1]=="o" && casillas[2]=="o") hay_empate_o_quien_ha_ganado="o";
		if (casillas[3]=="o" && casillas[4]=="o" && casillas[5]=="o") hay_empate_o_quien_ha_ganado="o";
		if (casillas[6]=="o" && casillas[7]=="o" && casillas[8]=="o") hay_empate_o_quien_ha_ganado="o";

		if (casillas[0]=="o" && casillas[3]=="o" && casillas[6]=="o") hay_empate_o_quien_ha_ganado="o";
		if (casillas[1]=="o" && casillas[4]=="o" && casillas[7]=="o") hay_empate_o_quien_ha_ganado="o";
		if (casillas[2]=="o" && casillas[5]=="o" && casillas[8]=="o") hay_empate_o_quien_ha_ganado="o";

		if (casillas[0]=="o" && casillas[4]=="o" && casillas[8]=="o") hay_empate_o_quien_ha_ganado="o";
		if (casillas[6]=="o" && casillas[4]=="o" && casillas[2]=="o") hay_empate_o_quien_ha_ganado="o";			

		for (cont=0; cont<9; cont++)
		{
			if (casillas[cont]=="v") cont2++;
		}

		if (hay_empate_o_quien_ha_ganado=="x")
		{
			document.getElementById("panel_de_mensajes").style.backgroundImage = "url('imagenes/han_ganado_las_x.png')";
			juego_terminado=true;
			return "terminado";
		} 
		else if (hay_empate_o_quien_ha_ganado=="o")
		{
			document.getElementById("panel_de_mensajes").style.backgroundImage = "url('imagenes/han_ganado_las_o.png')";
			juego_terminado=true;
			return "terminado";
		}
		else if (hay_empate_o_quien_ha_ganado=="empate" && cont2==0)
		{
			document.getElementById("panel_de_mensajes").style.backgroundImage = "url('imagenes/hay_empate.png')";
			juego_terminado=true;
			return "terminado";
		}
		else return "no_terminado";
		}
	}

	function borrar(posicion)
	{
		if (posicion==0) div_1.style.backgroundImage = "url('imagenes/blanco.png')";		
		else if (posicion==1) div_2.style.backgroundImage = "url('imagenes/blanco.png')";	
		else if (posicion==2) div_3.style.backgroundImage = "url('imagenes/blanco.png')";
		else if (posicion==3) div_4.style.backgroundImage = "url('imagenes/blanco.png')";
		else if (posicion==4) div_5.style.backgroundImage = "url('imagenes/blanco.png')";	
		else if (posicion==5) div_6.style.backgroundImage = "url('imagenes/blanco.png')";
		else if (posicion==6) div_7.style.backgroundImage = "url('imagenes/blanco.png')";
		else if (posicion==7) div_8.style.backgroundImage = "url('imagenes/blanco.png')";
		else if (posicion==8) div_9.style.backgroundImage = "url('imagenes/blanco.png')";
	}

	function poner_x(posicion)
	{
		if (posicion==0) div_1.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";		
		else if (posicion==1) div_2.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";	
		else if (posicion==2) div_3.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";
		else if (posicion==3) div_4.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";
		else if (posicion==4) div_5.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";	
		else if (posicion==5) div_6.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";
		else if (posicion==6) div_7.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";
		else if (posicion==7) div_8.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";
		else if (posicion==8) div_9.style.backgroundImage = "url('imagenes/cuadro_x_blanco.png')";
	}

	function poner_x_verde(posicion)
	{
		if (posicion==0) div_1.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";		
		else if (posicion==1) div_2.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";	
		else if (posicion==2) div_3.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";
		else if (posicion==3) div_4.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";
		else if (posicion==4) div_5.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";	
		else if (posicion==5) div_6.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";
		else if (posicion==6) div_7.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";
		else if (posicion==7) div_8.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";
		else if (posicion==8) div_9.style.backgroundImage = "url('imagenes/cuadro_x_verde.png')";
	}

	function poner_o(posicion)
	{
		if (posicion==0) div_1.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";		
		else if (posicion==1) div_2.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";	
		else if (posicion==2) div_3.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";
		else if (posicion==3) div_4.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";
		else if (posicion==4) div_5.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";	
		else if (posicion==5) div_6.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";
		else if (posicion==6) div_7.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";
		else if (posicion==7) div_8.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";
		else if (posicion==8) div_9.style.backgroundImage = "url('imagenes/cuadro_o_blanco.png')";
	}

	function poner_o_verde(posicion)
	{
		if (posicion==0) div_1.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";		
		else if (posicion==1) div_2.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";	
		else if (posicion==2) div_3.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";
		else if (posicion==3) div_4.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";
		else if (posicion==4) div_5.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";	
		else if (posicion==5) div_6.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";
		else if (posicion==6) div_7.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";
		else if (posicion==7) div_8.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";
		else if (posicion==8) div_9.style.backgroundImage = "url('imagenes/cuadro_o_verde.png')";
	}

	function escoger_aleatoriamente_entre_las_4_esquinas()
	{		
		var aleatorio_temp=Math.floor(Math.random()*4);
		if (aleatorio_temp==0) return 0;
		else if (aleatorio_temp==1) return 2;
		else if (aleatorio_temp==2) return 6;
		else if (aleatorio_temp==3) return 8;
	}

	function complitud_de_la_x()
	{
		//HORIZONTAL

		if (casillas[0]=="x" && casillas[1]=="x" && casillas[2]=="v") return 2;
		else if (casillas[1]=="x" && casillas[2]=="x" && casillas[0]=="v") return 0;
		else if (casillas[0]=="x" && casillas[2]=="x" && casillas[1]=="v") return 1;

		else if (casillas[3]=="x" && casillas[4]=="x" && casillas[5]=="v") return 5;
		else if (casillas[4]=="x" && casillas[5]=="x" && casillas[3]=="v") return 3;
		else if (casillas[3]=="x" && casillas[5]=="x" && casillas[4]=="v") return 4;

		else if (casillas[6]=="x" && casillas[7]=="x" && casillas[8]=="v") return 8;
		else if (casillas[7]=="x" && casillas[8]=="x" && casillas[6]=="v") return 6;
		else if (casillas[6]=="x" && casillas[8]=="x" && casillas[7]=="v") return 7;

		//VERTICAL

		else if (casillas[0]=="x" && casillas[3]=="x" && casillas[6]=="v") return 6;
		else if (casillas[3]=="x" && casillas[6]=="x" && casillas[0]=="v") return 0;
		else if (casillas[0]=="x" && casillas[6]=="x" && casillas[3]=="v") return 3;

		else if (casillas[1]=="x" && casillas[4]=="x" && casillas[7]=="v") return 7;
		else if (casillas[4]=="x" && casillas[7]=="x" && casillas[1]=="v") return 1;
		else if (casillas[1]=="x" && casillas[7]=="x" && casillas[4]=="v") return 4;

		else if (casillas[2]=="x" && casillas[5]=="x" && casillas[8]=="v") return 8;
		else if (casillas[5]=="x" && casillas[8]=="x" && casillas[2]=="v") return 2;
		else if (casillas[2]=="x" && casillas[8]=="x" && casillas[5]=="v") return 5;

		//DIAGONAL

		else if (casillas[0]=="x" && casillas[4]=="x" && casillas[8]=="v") return 8;
		else if (casillas[4]=="x" && casillas[8]=="x" && casillas[0]=="v") return 0;

		else if (casillas[6]=="x" && casillas[4]=="x" && casillas[2]=="v") return 2;
		else if (casillas[4]=="x" && casillas[2]=="x" && casillas[6]=="v") return 6;

		else return "las_x_no";
	}

	function complitud_de_la_o()
	{
		//HORIZONTAL

		if (casillas[0]=="o" && casillas[1]=="o" && casillas[2]=="v") return 2;
		else if (casillas[1]=="o" && casillas[2]=="o" && casillas[0]=="v") return 0;
		else if (casillas[0]=="o" && casillas[2]=="o" && casillas[1]=="v") return 1;

		else if (casillas[3]=="o" && casillas[4]=="o" && casillas[5]=="v") return 5;
		else if (casillas[4]=="o" && casillas[5]=="o" && casillas[3]=="v") return 3;
		else if (casillas[3]=="o" && casillas[5]=="o" && casillas[4]=="v") return 4;

		else if (casillas[6]=="o" && casillas[7]=="o" && casillas[8]=="v") return 8;
		else if (casillas[7]=="o" && casillas[8]=="o" && casillas[6]=="v") return 6;
		else if (casillas[6]=="o" && casillas[8]=="o" && casillas[7]=="v") return 7;

		//VERTICAL

		else if (casillas[0]=="o" && casillas[3]=="o" && casillas[6]=="v") return 6;
		else if (casillas[3]=="o" && casillas[6]=="o" && casillas[0]=="v") return 0;
		else if (casillas[0]=="o" && casillas[6]=="o" && casillas[3]=="v") return 3;

		else if (casillas[1]=="o" && casillas[4]=="o" && casillas[7]=="v") return 7;
		else if (casillas[4]=="o" && casillas[7]=="o" && casillas[1]=="v") return 1;
		else if (casillas[1]=="o" && casillas[7]=="o" && casillas[4]=="v") return 4;

		else if (casillas[2]=="o" && casillas[5]=="o" && casillas[8]=="v") return 8;
		else if (casillas[5]=="o" && casillas[8]=="o" && casillas[2]=="v") return 2;
		else if (casillas[2]=="o" && casillas[8]=="o" && casillas[5]=="v") return 5;

		//DIAGONAL

		else if (casillas[0]=="o" && casillas[4]=="o" && casillas[8]=="v") return 8;
		else if (casillas[4]=="o" && casillas[8]=="o" && casillas[0]=="v") return 0;

		else if (casillas[6]=="o" && casillas[4]=="o" && casillas[2]=="v") return 2;
		else if (casillas[4]=="o" && casillas[2]=="o" && casillas[6]=="v") return 6;

		else return "las_o_no";
	}

	function posicion_inteligente_fichas_fijas()
	{			
		var cont=0;
		var cont2=0;

		for (cont=0; cont<9; cont++)
		{
			if (casillas[cont]=="v") cont2++;
		}

		if (cont2==9) return 4;
		else if (cont2==8)
		{
			if (casillas[4]=="v") return 4;
			else return escoger_aleatoriamente_entre_las_4_esquinas();
		}
		else if (cont2==7)
		{
			cont=0;
			if (casillas[0]=="v") cont++;
			if (casillas[2]=="v") cont++;
			if (casillas[6]=="v") cont++;
			if (casillas[8]=="v") cont++;

			if (cont==4) return escoger_aleatoriamente_entre_las_4_esquinas();
			else
			{
				var aleatorio_temp=Math.floor(Math.random()*3);
				if (casillas[0]!="v")
				{
					if (aleatorio_temp==0) return 2;
					else if (aleatorio_temp==1)	return 6;
					else if (aleatorio_temp==2) return 8;
				}
				else if (casillas[2]!="v")
				{
					if (aleatorio_temp==0) return 0;
					else if (aleatorio_temp==1)	return 6;
					else if (aleatorio_temp==2) return 8;
				}
				else if (casillas[6]!="v")
				{
					if (aleatorio_temp==0) return 0;
					else if (aleatorio_temp==1)	return 2;
					else if (aleatorio_temp==2) return 8;
				}
				else if (casillas[8]!="v")
				{
					if (aleatorio_temp==0) return 0;
					else if (aleatorio_temp==1)	return 2;
					else if (aleatorio_temp==2) return 6;
				}						
			}
		}
		else
		{
			var x;
			var y;

			if (el_ordenador_juega_con=="circulos")
			{
				// ATACAQUE
				x=complitud_de_la_x();
				if (x=="las_x_no")
				{
					// DEFENSA
					y=complitud_de_la_o();
					if (y=="las_o_no") return posicion_aleatoria_fichas_fijas();
					else return y;				
				}
				else return x;		
			}
			else if (el_ordenador_juega_con=="equis")
			{
				// ATACAQUE
				y=complitud_de_la_o();
				if (y=="las_o_no")
				{
				// DEFENSA
					x=complitud_de_la_x();
					if (x=="las_x_no") return posicion_aleatoria_fichas_fijas();
					else return x;				
				}
				else return y;	
			}
		}
	}

	function posicion_aleatoria_fichas_fijas()
	{
		var cont=0;
		var cont2=0;

		for (cont=0; cont<9; cont++)
		{
			if (casillas[cont]=="v") cont2++;
		}

		var aleatorio_temp=Math.floor(Math.random()*cont2);			

		var posicion_definitiva=0;

		cont2=0;		

		for (cont=0; cont<9; cont++)
		{
			if (casillas[cont]=="v")
			{								
				if (cont2==aleatorio_temp) posicion_definitiva=cont;
				cont2++;	
			} 
		}
		
		return posicion_definitiva;
	}

	function puedo_mover_mi_ficha_movible()
	{

		var cantidad_de_movimientos_posibles=0;

		if (teclapulsada==4) return true;
		else
		{
			if (teclapulsada==0)
			{
				if (casillas[1]=="v" || casillas[4]=="v" || casillas[3]=="v") return true;
				else return false;
			}
			else if (teclapulsada==1)
			{
				if (casillas[0]=="v" || casillas[4]=="v" || casillas[2]=="v") return true;
				else return false;
			} 
			else if (teclapulsada==2)
			{
				if (casillas[1]=="v" || casillas[4]=="v" || casillas[5]=="v") return true;
				else return false;
			}
			else if (teclapulsada==3)
			{
				if (casillas[0]=="v" || casillas[4]=="v" || casillas[6]=="v") return true;
				else return false;
			}
			else if (teclapulsada==5)
			{
				if (casillas[2]=="v" || casillas[4]=="v" || casillas[8]=="v") return true;
				else return false;
			}
			else if (teclapulsada==6)
			{
				if (casillas[3]=="v" || casillas[4]=="v" || casillas[7]=="v") return true;
				else return false;
			}
			else if (teclapulsada==7)
			{
				if (casillas[6]=="v" || casillas[4]=="v" || casillas[8]=="v") return true;
				else return false;
			}
			else if (teclapulsada==8)
			{
				if (casillas[7]=="v" || casillas[4]=="v" || casillas[5]=="v") return true;
				else return false;
			}
		}
	}

	function posicion_aleatoria_fichas_movibles()
	{

	// ESTAMOS DETERMINANDO QUE MOVIMIENTOS SON POSIBLES Y CUALES NO
		// EL OBJETIVO ES AL TERMINAR ESTE PROCESO ESCOGER ALEATORIAMENTE UNO DE LOS POSIBLES
		// EL ORDEN DE COMPROBACIÓN ESTÁ BASADO EN MIRAR SI LA POSICIÓN DE ORIGEN ESTÁ OCUPADA
		// POR NUESTRA FICHA EMPEZANDO DESDE LA POSICIÓN CERO Y SUBIENDO HASTA LA 8
		// DESDE CADA POSICIÓN DE ORIGEN PROVAMOS TODOS SUS POSIBLES DESTINOS
		//EL ORDEN DE LOS DESTINOS LO TERMINO EN FUNCIÓN DE UN GIRO IMAGINARIO EN EL SENTIDO HORARIO
		//DE ESTA FORMA, EL PRIMER NÚMERO ES AQUEL POR EL QUE PRIMERO ENTRARÍA LA ABUJA DEL RELOJ
		//CONSIDERANDO LAS CASILLAS ORDENADAS COMO:
		//0 1 2
		//3 4 5
		//6 7 8


		var cantidad_de_movimientos_posibles=0;

		if (el_ordenador_juega_con=="equis")
		{
			// MOVIMIENTOS DESDE LA CASILLA 0

			if (casillas[0]=="x" && casillas[1]=="v") movimientos_posibles_fichas_movibles[0]=true;
			else movimientos_posibles_fichas_movibles[0]=false;

			if (casillas[0]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[1]=true;
			else movimientos_posibles_fichas_movibles[1]=false;

			if (casillas[0]=="x" && casillas[3]=="v") movimientos_posibles_fichas_movibles[2]=true;
			else movimientos_posibles_fichas_movibles[2]=false;

			// MOVIMIENTOS DESDE LA CASILLA 1

			if (casillas[1]=="x" && casillas[2]=="v") movimientos_posibles_fichas_movibles[3]=true;
			else movimientos_posibles_fichas_movibles[3]=false;

			if (casillas[1]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[4]=true;
			else movimientos_posibles_fichas_movibles[4]=false;

			if (casillas[1]=="x" && casillas[0]=="v") movimientos_posibles_fichas_movibles[5]=true;
			else movimientos_posibles_fichas_movibles[5]=false;

			// MOVIMIENTOS DESDE LA CASILLA 2

			if (casillas[2]=="x" && casillas[5]=="v") movimientos_posibles_fichas_movibles[6]=true;
			else movimientos_posibles_fichas_movibles[6]=false;

			if (casillas[2]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[7]=true;
			else movimientos_posibles_fichas_movibles[7]=false;

			if (casillas[2]=="x" && casillas[1]=="v") movimientos_posibles_fichas_movibles[8]=true;
			else movimientos_posibles_fichas_movibles[8]=false;

			// MOVIMIENTOS DESDE LA CASILLA 3

			if (casillas[3]=="x" && casillas[0]=="v") movimientos_posibles_fichas_movibles[9]=true;
			else movimientos_posibles_fichas_movibles[9]=false;

			if (casillas[3]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[10]=true;
			else movimientos_posibles_fichas_movibles[10]=false;

			if (casillas[3]=="x" && casillas[6]=="v") movimientos_posibles_fichas_movibles[11]=true;
			else movimientos_posibles_fichas_movibles[11]=false;

			// MOVIMIENTOS DESDE LA CASILLA 4

			if (casillas[4]=="x" && casillas[0]=="v") movimientos_posibles_fichas_movibles[12]=true;
			else movimientos_posibles_fichas_movibles[12]=false;

			if (casillas[4]=="x" && casillas[1]=="v") movimientos_posibles_fichas_movibles[13]=true;
			else movimientos_posibles_fichas_movibles[13]=false;

			if (casillas[4]=="x" && casillas[2]=="v") movimientos_posibles_fichas_movibles[14]=true;
			else movimientos_posibles_fichas_movibles[14]=false;

			if (casillas[4]=="x" && casillas[5]=="v") movimientos_posibles_fichas_movibles[15]=true;
			else movimientos_posibles_fichas_movibles[15]=false;

			if (casillas[4]=="x" && casillas[8]=="v") movimientos_posibles_fichas_movibles[16]=true;
			else movimientos_posibles_fichas_movibles[16]=false;

			if (casillas[4]=="x" && casillas[7]=="v") movimientos_posibles_fichas_movibles[17]=true;
			else movimientos_posibles_fichas_movibles[17]=false;

			if (casillas[4]=="x" && casillas[6]=="v") movimientos_posibles_fichas_movibles[18]=true;
			else movimientos_posibles_fichas_movibles[18]=false;

			if (casillas[4]=="x" && casillas[3]=="v") movimientos_posibles_fichas_movibles[19]=true;
			else movimientos_posibles_fichas_movibles[19]=false;

			// MOVIMIENTOS DESDE LA CASILLA 5

			if (casillas[5]=="x" && casillas[8]=="v") movimientos_posibles_fichas_movibles[20]=true;
			else movimientos_posibles_fichas_movibles[20]=false;

			if (casillas[5]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[21]=true;
			else movimientos_posibles_fichas_movibles[21]=false;

			if (casillas[5]=="x" && casillas[2]=="v") movimientos_posibles_fichas_movibles[22]=true;
			else movimientos_posibles_fichas_movibles[22]=false;

			// MOVIMIENTOS DESDE LA CASILLA 6

			if (casillas[6]=="x" && casillas[3]=="v") movimientos_posibles_fichas_movibles[23]=true;
			else movimientos_posibles_fichas_movibles[23]=false;

			if (casillas[6]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[24]=true;
			else movimientos_posibles_fichas_movibles[24]=false;

			if (casillas[6]=="x" && casillas[7]=="v") movimientos_posibles_fichas_movibles[25]=true;
			else movimientos_posibles_fichas_movibles[25]=false;

			// MOVIMIENTOS DESDE LA CASILLA 7

			if (casillas[7]=="x" && casillas[6]=="v") movimientos_posibles_fichas_movibles[26]=true;
			else movimientos_posibles_fichas_movibles[26]=false;

			if (casillas[7]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[27]=true;
			else movimientos_posibles_fichas_movibles[27]=false;

			if (casillas[7]=="x" && casillas[8]=="v") movimientos_posibles_fichas_movibles[28]=true;
			else movimientos_posibles_fichas_movibles[28]=false;

			// MOVIMIENTOS DESDE LA CASILLA 8

			if (casillas[8]=="x" && casillas[7]=="v") movimientos_posibles_fichas_movibles[29]=true;
			else movimientos_posibles_fichas_movibles[29]=false;

			if (casillas[8]=="x" && casillas[4]=="v") movimientos_posibles_fichas_movibles[30]=true;
			else movimientos_posibles_fichas_movibles[30]=false;

			if (casillas[8]=="x" && casillas[5]=="v") movimientos_posibles_fichas_movibles[31]=true;
			else movimientos_posibles_fichas_movibles[31]=false;			

		}
		else if (el_ordenador_juega_con=="circulos")
		{
			// MOVIMIENTOS DESDE LA CASILLA 0

			if (casillas[0]=="o" && casillas[1]=="v") movimientos_posibles_fichas_movibles[0]=true;
			else movimientos_posibles_fichas_movibles[0]=false;

			if (casillas[0]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[1]=true;
			else movimientos_posibles_fichas_movibles[1]=false;

			if (casillas[0]=="o" && casillas[3]=="v") movimientos_posibles_fichas_movibles[2]=true;
			else movimientos_posibles_fichas_movibles[2]=false;

			// MOVIMIENTOS DESDE LA CASILLA 1

			if (casillas[1]=="o" && casillas[2]=="v") movimientos_posibles_fichas_movibles[3]=true;
			else movimientos_posibles_fichas_movibles[3]=false;

			if (casillas[1]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[4]=true;
			else movimientos_posibles_fichas_movibles[4]=false;

			if (casillas[1]=="o" && casillas[0]=="v") movimientos_posibles_fichas_movibles[5]=true;
			else movimientos_posibles_fichas_movibles[5]=false;

			// MOVIMIENTOS DESDE LA CASILLA 2

			if (casillas[2]=="o" && casillas[5]=="v") movimientos_posibles_fichas_movibles[6]=true;
			else movimientos_posibles_fichas_movibles[6]=false;

			if (casillas[2]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[7]=true;
			else movimientos_posibles_fichas_movibles[7]=false;

			if (casillas[2]=="o" && casillas[1]=="v") movimientos_posibles_fichas_movibles[8]=true;
			else movimientos_posibles_fichas_movibles[8]=false;

			// MOVIMIENTOS DESDE LA CASILLA 3

			if (casillas[3]=="o" && casillas[0]=="v") movimientos_posibles_fichas_movibles[9]=true;
			else movimientos_posibles_fichas_movibles[9]=false;

			if (casillas[3]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[10]=true;
			else movimientos_posibles_fichas_movibles[10]=false;

			if (casillas[3]=="o" && casillas[6]=="v") movimientos_posibles_fichas_movibles[11]=true;
			else movimientos_posibles_fichas_movibles[11]=false;

			// MOVIMIENTOS DESDE LA CASILLA 4

			if (casillas[4]=="o" && casillas[0]=="v") movimientos_posibles_fichas_movibles[12]=true;
			else movimientos_posibles_fichas_movibles[12]=false;

			if (casillas[4]=="o" && casillas[1]=="v") movimientos_posibles_fichas_movibles[13]=true;
			else movimientos_posibles_fichas_movibles[13]=false;

			if (casillas[4]=="o" && casillas[2]=="v") movimientos_posibles_fichas_movibles[14]=true;
			else movimientos_posibles_fichas_movibles[14]=false;

			if (casillas[4]=="o" && casillas[5]=="v") movimientos_posibles_fichas_movibles[15]=true;
			else movimientos_posibles_fichas_movibles[15]=false;

			if (casillas[4]=="o" && casillas[8]=="v") movimientos_posibles_fichas_movibles[16]=true;
			else movimientos_posibles_fichas_movibles[16]=false;

			if (casillas[4]=="o" && casillas[7]=="v") movimientos_posibles_fichas_movibles[17]=true;
			else movimientos_posibles_fichas_movibles[17]=false;

			if (casillas[4]=="o" && casillas[6]=="v") movimientos_posibles_fichas_movibles[18]=true;
			else movimientos_posibles_fichas_movibles[18]=false;

			if (casillas[4]=="o" && casillas[3]=="v") movimientos_posibles_fichas_movibles[19]=true;
			else movimientos_posibles_fichas_movibles[19]=false;

			// MOVIMIENTOS DESDE LA CASILLA 5

			if (casillas[5]=="o" && casillas[8]=="v") movimientos_posibles_fichas_movibles[20]=true;
			else movimientos_posibles_fichas_movibles[20]=false;

			if (casillas[5]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[21]=true;
			else movimientos_posibles_fichas_movibles[21]=false;

			if (casillas[5]=="o" && casillas[2]=="v") movimientos_posibles_fichas_movibles[22]=true;
			else movimientos_posibles_fichas_movibles[22]=false;

			// MOVIMIENTOS DESDE LA CASILLA 6

			if (casillas[6]=="o" && casillas[3]=="v") movimientos_posibles_fichas_movibles[23]=true;
			else movimientos_posibles_fichas_movibles[23]=false;

			if (casillas[6]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[24]=true;
			else movimientos_posibles_fichas_movibles[24]=false;

			if (casillas[6]=="o" && casillas[7]=="v") movimientos_posibles_fichas_movibles[25]=true;
			else movimientos_posibles_fichas_movibles[25]=false;

			// MOVIMIENTOS DESDE LA CASILLA 7

			if (casillas[7]=="o" && casillas[6]=="v") movimientos_posibles_fichas_movibles[26]=true;
			else movimientos_posibles_fichas_movibles[26]=false;

			if (casillas[7]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[27]=true;
			else movimientos_posibles_fichas_movibles[27]=false;

			if (casillas[7]=="o" && casillas[8]=="v") movimientos_posibles_fichas_movibles[28]=true;
			else movimientos_posibles_fichas_movibles[28]=false;

			// MOVIMIENTOS DESDE LA CASILLA 8

			if (casillas[8]=="o" && casillas[7]=="v") movimientos_posibles_fichas_movibles[29]=true;
			else movimientos_posibles_fichas_movibles[29]=false;

			if (casillas[8]=="o" && casillas[4]=="v") movimientos_posibles_fichas_movibles[30]=true;
			else movimientos_posibles_fichas_movibles[30]=false;

			if (casillas[8]=="o" && casillas[5]=="v") movimientos_posibles_fichas_movibles[31]=true;
			else movimientos_posibles_fichas_movibles[31]=false;	
		}

		for (var cont=0; cont<32; cont++)
		{
			if (movimientos_posibles_fichas_movibles[cont]==true)
			{
				cantidad_de_movimientos_posibles++;
			}
		}

		var posicion_de_movimiento_posible=Math.floor(Math.random()*cantidad_de_movimientos_posibles);

		posicion_de_movimiento_posible++;

		movimiento_posible_final=0;

		var cont2=0;

		while (cont2<posicion_de_movimiento_posible)
		{
			if (movimientos_posibles_fichas_movibles[movimiento_posible_final]==true) cont2++;
			movimiento_posible_final++;
		}

		movimiento_posible_final--;

		var respuesta_movimiento_aleatorio = [0, 0];

		//MOVIMIENTOS DESDE EL CERO
		if (movimiento_posible_final==0)
		{
			respuesta_movimiento_aleatorio[0]=0;
			respuesta_movimiento_aleatorio[1]=1;
		}
		else if (movimiento_posible_final==1)
		{
			respuesta_movimiento_aleatorio[0]=0;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==2)
		{
			respuesta_movimiento_aleatorio[0]=0;
			respuesta_movimiento_aleatorio[1]=3;
		}

		//MOVIMIENTOS DESDE EL UNO
		else if (movimiento_posible_final==3)
		{
			respuesta_movimiento_aleatorio[0]=1;
			respuesta_movimiento_aleatorio[1]=2;
		}
		else if (movimiento_posible_final==4)
		{
			respuesta_movimiento_aleatorio[0]=1;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==5)
		{
			respuesta_movimiento_aleatorio[0]=1;
			respuesta_movimiento_aleatorio[1]=0;
		}

		//MOVIMIENTOS DESDE EL DOS
		else if (movimiento_posible_final==6)
		{
			respuesta_movimiento_aleatorio[0]=2;
			respuesta_movimiento_aleatorio[1]=5;
		}
		else if (movimiento_posible_final==7)
		{
			respuesta_movimiento_aleatorio[0]=2;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==8)
		{
			respuesta_movimiento_aleatorio[0]=2;
			respuesta_movimiento_aleatorio[1]=1;
		}

		//MOVIMIENTOS DESDE EL TRES
		else if (movimiento_posible_final==9)
		{
			respuesta_movimiento_aleatorio[0]=3;
			respuesta_movimiento_aleatorio[1]=0;
		}
		else if (movimiento_posible_final==10)
		{
			respuesta_movimiento_aleatorio[0]=3;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==11)
		{
			respuesta_movimiento_aleatorio[0]=3;
			respuesta_movimiento_aleatorio[1]=6;
		}

		//MOVIMIENTOS DESDE EL CUATRO
		else if (movimiento_posible_final==12)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=0;
		}
		else if (movimiento_posible_final==13)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=1;
		}
		else if (movimiento_posible_final==14)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=2;
		}
		else if (movimiento_posible_final==15)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=5;
		}
		else if (movimiento_posible_final==16)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=8;
		}
		else if (movimiento_posible_final==17)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=7;
		}
		else if (movimiento_posible_final==18)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=6;
		}
		else if (movimiento_posible_final==19)
		{
			respuesta_movimiento_aleatorio[0]=4;
			respuesta_movimiento_aleatorio[1]=3;
		}

		//MOVIMIENTOS DESDE EL CINCO
		else if (movimiento_posible_final==20)
		{
			respuesta_movimiento_aleatorio[0]=5;
			respuesta_movimiento_aleatorio[1]=8;
		}
		else if (movimiento_posible_final==21)
		{
			respuesta_movimiento_aleatorio[0]=5;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==22)
		{
			respuesta_movimiento_aleatorio[0]=5;
			respuesta_movimiento_aleatorio[1]=2;
		}

		//MOVIMIENTOS DESDE EL SEIS
		else if (movimiento_posible_final==23)
		{
			respuesta_movimiento_aleatorio[0]=6;
			respuesta_movimiento_aleatorio[1]=3;
		}
		else if (movimiento_posible_final==24)
		{
			respuesta_movimiento_aleatorio[0]=6;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==25)
		{
			respuesta_movimiento_aleatorio[0]=6;
			respuesta_movimiento_aleatorio[1]=7;
		}

		//MOVIMIENTOS DESDE EL SIETE
		else if (movimiento_posible_final==26)
		{
			respuesta_movimiento_aleatorio[0]=7;
			respuesta_movimiento_aleatorio[1]=6;
		}
		else if (movimiento_posible_final==27)
		{
			respuesta_movimiento_aleatorio[0]=7;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==28)
		{
			respuesta_movimiento_aleatorio[0]=7;
			respuesta_movimiento_aleatorio[1]=8;
		}

		//MOVIMIENTOS DESDE EL OCHO
		else if (movimiento_posible_final==29)
		{
			respuesta_movimiento_aleatorio[0]=8;
			respuesta_movimiento_aleatorio[1]=7;
		}
		else if (movimiento_posible_final==30)
		{
			respuesta_movimiento_aleatorio[0]=8;
			respuesta_movimiento_aleatorio[1]=4;
		}
		else if (movimiento_posible_final==31)
		{
			respuesta_movimiento_aleatorio[0]=8;
			respuesta_movimiento_aleatorio[1]=5;
		}

		return 	respuesta_movimiento_aleatorio;		
	}

	function posicion_inteligente_fichas_movibles()
	{
		var respuesta_movimiento_inteligente = [0, 0];

		if (el_ordenador_juega_con=="equis")
		{
			// ATAQUE

			// ATAQUE - LINEA LATERAL IZQUIERDA

			if (casillas[3]=="x" && casillas[6]=="x" && casillas[4]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[6]=="x" && casillas[1]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[6]=="x" && casillas[4]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[3]=="x" && casillas[4]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[3]=="x" && casillas[7]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA SUPERIOR

			else if (casillas[0]=="x" && casillas[1]=="x" && casillas[4]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[1]=="x" && casillas[5]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[2]=="x" && casillas[4]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[2]=="x" && casillas[4]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[2]=="x" && casillas[3]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			// ATAQUE - LINEA LATERAL DERECHA

			else if (casillas[5]=="x" && casillas[8]=="x" && casillas[4]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[5]=="x" && casillas[8]=="x" && casillas[1]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[2]=="x" && casillas[8]=="x" && casillas[4]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[2]=="x" && casillas[5]=="x" && casillas[4]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[2]=="x" && casillas[5]=="x" && casillas[7]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA INFERIOR

			else if (casillas[6]=="x" && casillas[7]=="x" && casillas[4]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[6]=="x" && casillas[7]=="x" && casillas[5]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[6]=="x" && casillas[8]=="x" && casillas[4]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[7]=="x" && casillas[8]=="x" && casillas[4]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[7]=="x" && casillas[8]=="x" && casillas[3]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA VERTICAL CENTRAL

			else if (casillas[4]=="x" && casillas[7]=="x" && casillas[0]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[4]=="x" && casillas[7]=="x" && casillas[2]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && casillas[3]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && casillas[0]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && casillas[2]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && casillas[8]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && casillas[5]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[4]=="x" && casillas[6]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="x" && casillas[4]=="x" && casillas[8]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA HORIZONTAL CENTRAL

			else if (casillas[4]=="x" && casillas[5]=="x" && casillas[0]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[4]=="x" && casillas[5]=="x" && casillas[6]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && casillas[0]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && casillas[1]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && casillas[2]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && casillas[7]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && casillas[8]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[4]=="x" && casillas[2]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="x" && casillas[4]=="x" && casillas[8]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - DIAGONAL - ARRIBA IZQUIERDA - ABAJO DERECHA

			else if (casillas[4]=="x" && casillas[8]=="x" && casillas[1]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[4]=="x" && casillas[8]=="x" && casillas[3]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && casillas[1]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && casillas[2]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && casillas[3]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && casillas[5]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && casillas[7]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			
			// ATAQUE - DIAGONAL - ABAJO IZQUIERDA - ARRIBA DERECHA

			else if (casillas[6]=="x" && casillas[4]=="x" && casillas[1]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[4]=="x" && casillas[5]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[2]=="x" && casillas[0]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[2]=="x" && casillas[1]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[2]=="x" && casillas[3]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[2]=="x" && casillas[5]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[2]=="x" && casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[2]=="x" && casillas[7]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[2]=="x" && casillas[8]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[2]=="x" && casillas[3]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[2]=="x" && casillas[7]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA

			// DEFENSA - LINEA VERTICAL CENTRAL

			else if (casillas[4]=="o" && casillas[7]=="o" && casillas[0]=="o" && casillas[2]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[7]=="o" && casillas[2]=="o" && casillas[0]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && (casillas[2]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[6]=="o" || casillas[8]=="o") && casillas[0]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && (casillas[0]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[6]=="o" || casillas[8]=="o") && casillas[2]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && (casillas[0]=="o" || casillas[2]=="o" || casillas[5]=="o" || casillas[6]=="o" || casillas[8]=="o") && casillas[3]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && (casillas[0]=="o" || casillas[2]=="o" || casillas[3]=="o" || casillas[6]=="o" || casillas[8]=="o") && casillas[5]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && (casillas[0]=="o" || casillas[2]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[8]=="o") && casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && (casillas[0]=="o" || casillas[2]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[6]=="o") && casillas[8]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[4]=="o" && casillas[6]=="o" && casillas[8]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[4]=="o" && casillas[8]=="o" && casillas[6]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA - LINEA HORIZONTAL CENTRAL

			else if (casillas[4]=="o" && casillas[5]=="o" && casillas[0]=="o" && casillas[6]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[5]=="o" && casillas[6]=="o" && casillas[0]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && (casillas[1]=="o" || casillas[2]=="o" || casillas[6]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[0]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && (casillas[0]=="o" || casillas[2]=="o" || casillas[6]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[1]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[6]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[2]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[2]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[2]=="o" || casillas[6]=="o" || casillas[8]=="o") && casillas[7]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[2]=="o" || casillas[6]=="o" || casillas[7]=="o") && casillas[8]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[4]=="o" && casillas[8]=="o" && casillas[2]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[4]=="o" && casillas[2]=="o" && casillas[8]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA - DIAGONAL - ARRIBA IZQUIERDA - ABAJO DERECHA

			else if (casillas[4]=="o" && casillas[8]=="o" && casillas[3]=="o" && casillas[1]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[8]=="o" && casillas[1]=="o" && casillas[3]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && (casillas[2]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[6]=="o" || casillas[7]=="o") && casillas[1]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && (casillas[1]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[6]=="o" || casillas[7]=="o") && casillas[2]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && (casillas[1]=="o" || casillas[2]=="o" || casillas[5]=="o" || casillas[6]=="o" || casillas[7]=="o") && casillas[3]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && (casillas[1]=="o" || casillas[2]=="o" || casillas[3]=="o" || casillas[6]=="o" || casillas[7]=="o") && casillas[5]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && (casillas[1]=="o" || casillas[2]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[7]=="o") && casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && (casillas[1]=="o" || casillas[2]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[6]=="o") && casillas[7]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[4]=="o" && casillas[7]=="o" && casillas[5]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[4]=="o" && casillas[5]=="o" && casillas[7]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA - DIAGONAL - ARRIBA IZQUIERDA - ABAJO DERECHA

			else if (casillas[4]=="o" && casillas[6]=="o" && casillas[5]=="o" && casillas[1]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[6]=="o" && casillas[1]=="o" && casillas[5]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[6]=="o" && (casillas[1]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[0]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[6]=="o" && (casillas[0]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[1]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[6]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[5]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[3]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[6]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[3]=="o" || casillas[7]=="o" || casillas[8]=="o") && casillas[5]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[6]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[8]=="o") && casillas[7]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[6]=="o" && (casillas[0]=="o" || casillas[1]=="o" || casillas[3]=="o" || casillas[5]=="o" || casillas[7]=="o") && casillas[8]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[4]=="o" && casillas[7]=="o" && casillas[3]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[4]=="o" && casillas[3]=="o" && casillas[7]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			// ACERCAMIENTO AL TRES EN RAYA LATERAL

			// ACERCAMIENTO - LINEA LATERAL IZQUIERDA

				// ARRIBA

			else if (casillas[3]=="x" && casillas[6]=="x" && casillas[2]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[6]=="x" && casillas[5]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[6]=="x" && casillas[8]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[6]=="x" && casillas[7]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
				// MEDIO

			else if (casillas[0]=="x" && casillas[6]=="x" && casillas[1]=="x" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[6]=="x" && casillas[2]=="x" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[6]=="x" && casillas[5]=="x" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[6]=="x" && casillas[8]=="x" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[6]=="x" && casillas[7]=="x" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// ABAJO

			else if (casillas[0]=="x" && casillas[3]=="x" && casillas[1]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[3]=="x" && casillas[2]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[3]=="x" && casillas[5]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[3]=="x" && casillas[8]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// ACERCAMIENTO - LINEA LATERAL ARRIBA

				//IZQUIERDA

			else if (casillas[1]=="x" && casillas[2]=="x" && casillas[5]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[2]=="x" && casillas[8]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[2]=="x" && casillas[7]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[2]=="x" && casillas[6]=="x" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// MEDIO

			else if (casillas[0]=="x" && casillas[2]=="x" && casillas[5]=="x" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[2]=="x" && casillas[8]=="x" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[2]=="x" && casillas[7]=="x" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[2]=="x" && casillas[6]=="x" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[2]=="x" && casillas[3]=="x" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				//DERECHA


			else if (casillas[0]=="x" && casillas[1]=="x" && casillas[8]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[1]=="x" && casillas[7]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[1]=="x" && casillas[6]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[1]=="x" && casillas[3]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

		// ACERCAMIENTO - LINEA LATERAL DERECHA

			//ARRIBA

			else if (casillas[5]=="x" && casillas[8]=="x" && casillas[7]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="x" && casillas[8]=="x" && casillas[6]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="x" && casillas[8]=="x" && casillas[3]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="x" && casillas[8]=="x" && casillas[0]=="x" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// MEDIO

			else if (casillas[2]=="x" && casillas[8]=="x" && casillas[7]=="x" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[8]=="x" && casillas[6]=="x" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[8]=="x" && casillas[3]=="x" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[8]=="x" && casillas[0]=="x" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[8]=="x" && casillas[1]=="x" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// ABAJO

			else if (casillas[2]=="x" && casillas[5]=="x" && casillas[6]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[5]=="x" && casillas[3]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[5]=="x" && casillas[0]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[5]=="x" && casillas[1]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// ACERCAMIENTO - LINEA LATERAL ABAJO

				//IZQUIERDA

			else if (casillas[7]=="x" && casillas[8]=="x" && casillas[0]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="x" && casillas[8]=="x" && casillas[1]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="x" && casillas[8]=="x" && casillas[2]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="x" && casillas[8]=="x" && casillas[5]=="x" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// MEDIO

			else if (casillas[6]=="x" && casillas[8]=="x" && casillas[3]=="x" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[8]=="x" && casillas[0]=="x" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[8]=="x" && casillas[1]=="x" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[8]=="x" && casillas[2]=="x" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[8]=="x" && casillas[5]=="x" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				//DERECHA

			else if (casillas[6]=="x" && casillas[7]=="x" && casillas[3]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[7]=="x" && casillas[0]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[7]=="x" && casillas[1]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[7]=="x" && casillas[2]=="x" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// BÚSQUEDA DEL CENTRO DESDE DONDE NO SEA ESQUINA

			if (casillas[1]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			else if (casillas[3]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			else if (casillas[5]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			else if (casillas[7]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// BÚSQUEDA DEL CENTRO DESDE LAS ESQUINAS

			else if (casillas[0]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[8]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// BUSQUEDA DE ESQUINAS

			else if (casillas[1]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			// BUSQUEDA DE ESQUINA A NO ESQUINA

			else if (casillas[0]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[8]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[8]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			// BUSQUEDA DEL NO CENTRO

			else if (casillas[4]=="x" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}
		}
		else if (el_ordenador_juega_con=="circulos")
		{

		// ATAQUE

			// ATAQUE - LINEA LATERAL IZQUIERDA

			if (casillas[3]=="o" && casillas[6]=="o" && casillas[4]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[6]=="o" && casillas[1]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[6]=="o" && casillas[4]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[3]=="o" && casillas[4]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[3]=="o" && casillas[7]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA SUPERIOR

			else if (casillas[0]=="o" && casillas[1]=="o" && casillas[4]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[1]=="o" && casillas[5]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[2]=="o" && casillas[4]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[2]=="o" && casillas[4]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[2]=="o" && casillas[3]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			// ATAQUE - LINEA LATERAL DERECHA

			else if (casillas[5]=="o" && casillas[8]=="o" && casillas[4]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[5]=="o" && casillas[8]=="o" && casillas[1]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[2]=="o" && casillas[8]=="o" && casillas[4]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[2]=="o" && casillas[5]=="o" && casillas[4]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[2]=="o" && casillas[5]=="o" && casillas[7]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA INFERIOR

			else if (casillas[6]=="o" && casillas[7]=="o" && casillas[4]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[6]=="o" && casillas[7]=="o" && casillas[5]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[6]=="o" && casillas[8]=="o" && casillas[4]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[7]=="o" && casillas[8]=="o" && casillas[4]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[7]=="o" && casillas[8]=="o" && casillas[3]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA VERTICAL CENTRAL

			else if (casillas[4]=="o" && casillas[7]=="o" && casillas[0]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[4]=="o" && casillas[7]=="o" && casillas[2]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && casillas[3]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && casillas[0]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && casillas[2]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && casillas[8]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[7]=="o" && casillas[5]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[4]=="o" && casillas[6]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[1]=="o" && casillas[4]=="o" && casillas[8]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - LINEA HORIZONTAL CENTRAL

			else if (casillas[4]=="o" && casillas[5]=="o" && casillas[0]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[4]=="o" && casillas[5]=="o" && casillas[6]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && casillas[0]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && casillas[1]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && casillas[2]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && casillas[7]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[5]=="o" && casillas[8]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[4]=="o" && casillas[2]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[3]=="o" && casillas[4]=="o" && casillas[8]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;	
			}

			// ATAQUE - DIAGONAL - ARRIBA IZQUIERDA - ABAJO DERECHA

			else if (casillas[4]=="o" && casillas[8]=="o" && casillas[1]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[4]=="o" && casillas[8]=="o" && casillas[3]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && casillas[1]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && casillas[2]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && casillas[3]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && casillas[5]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;	
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[8]=="o" && casillas[7]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			
			// ATAQUE - DIAGONAL - ABAJO IZQUIERDA - ARRIBA DERECHA

			else if (casillas[6]=="o" && casillas[4]=="o" && casillas[1]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[4]=="o" && casillas[5]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[2]=="o" && casillas[0]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[2]=="o" && casillas[1]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[2]=="o" && casillas[3]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[2]=="o" && casillas[5]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[2]=="o" && casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[2]=="o" && casillas[7]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[2]=="o" && casillas[8]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[2]=="o" && casillas[3]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[2]=="o" && casillas[7]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA

			// DEFENSA - LINEA VERTICAL CENTRAL

			else if (casillas[4]=="x" && casillas[7]=="x" && casillas[0]=="x" && casillas[2]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[7]=="x" && casillas[2]=="x" && casillas[0]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && (casillas[2]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[6]=="x" || casillas[8]=="x") && casillas[0]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && (casillas[0]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[6]=="x" || casillas[8]=="x") && casillas[2]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && (casillas[0]=="x" || casillas[2]=="x" || casillas[5]=="x" || casillas[6]=="x" || casillas[8]=="x") && casillas[3]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && (casillas[0]=="x" || casillas[2]=="x" || casillas[3]=="x" || casillas[6]=="x" || casillas[8]=="x") && casillas[5]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && (casillas[0]=="x" || casillas[2]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[8]=="x") && casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[7]=="x" && (casillas[0]=="x" || casillas[2]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[6]=="x") && casillas[8]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[4]=="x" && casillas[6]=="x" && casillas[8]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="x" && casillas[4]=="x" && casillas[8]=="x" && casillas[6]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA - LINEA HORIZONTAL CENTRAL

			else if (casillas[4]=="x" && casillas[5]=="x" && casillas[0]=="x" && casillas[6]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[5]=="x" && casillas[6]=="x" && casillas[0]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && (casillas[1]=="x" || casillas[2]=="x" || casillas[6]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[0]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && (casillas[0]=="x" || casillas[2]=="x" || casillas[6]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[1]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[6]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[2]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[2]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[2]=="x" || casillas[6]=="x" || casillas[8]=="x") && casillas[7]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[5]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[2]=="x" || casillas[6]=="x" || casillas[7]=="x") && casillas[8]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[4]=="x" && casillas[8]=="x" && casillas[2]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="x" && casillas[4]=="x" && casillas[2]=="x" && casillas[8]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA - DIAGONAL - ARRIBA IZQUIERDA - ABAJO DERECHA

			else if (casillas[4]=="x" && casillas[8]=="x" && casillas[3]=="x" && casillas[1]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[8]=="x" && casillas[1]=="x" && casillas[3]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && (casillas[2]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[6]=="x" || casillas[7]=="x") && casillas[1]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && (casillas[1]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[6]=="x" || casillas[7]=="x") && casillas[2]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && (casillas[1]=="x" || casillas[2]=="x" || casillas[5]=="x" || casillas[6]=="x" || casillas[7]=="x") && casillas[3]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && (casillas[1]=="x" || casillas[2]=="x" || casillas[3]=="x" || casillas[6]=="x" || casillas[7]=="x") && casillas[5]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && (casillas[1]=="x" || casillas[2]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[7]=="x") && casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[8]=="x" && (casillas[1]=="x" || casillas[2]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[6]=="x") && casillas[7]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[4]=="x" && casillas[7]=="x" && casillas[5]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="x" && casillas[4]=="x" && casillas[5]=="x" && casillas[7]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			// DEFENSA - DIAGONAL - ARRIBA IZQUIERDA - ABAJO DERECHA

			else if (casillas[4]=="x" && casillas[6]=="x" && casillas[5]=="x" && casillas[1]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="x" && casillas[6]=="x" && casillas[1]=="x" && casillas[5]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[6]=="x" && (casillas[1]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[0]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[6]=="x" && (casillas[0]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[1]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[6]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[5]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[3]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[6]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[3]=="x" || casillas[7]=="x" || casillas[8]=="x") && casillas[5]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[6]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[8]=="x") && casillas[7]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[6]=="x" && (casillas[0]=="x" || casillas[1]=="x" || casillas[3]=="x" || casillas[5]=="x" || casillas[7]=="x") && casillas[8]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[4]=="x" && casillas[7]=="x" && casillas[3]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="x" && casillas[4]=="x" && casillas[3]=="x" && casillas[7]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			// ACERCAMIENTO AL TRES EN RAYA LATERAL

			// ACERCAMIENTO - LINEA LATERAL IZQUIERDA

				// ARRIBA

			else if (casillas[3]=="o" && casillas[6]=="o" && casillas[2]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[6]=="o" && casillas[5]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[6]=="o" && casillas[8]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[6]=="o" && casillas[7]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
				// MEDIO

			else if (casillas[0]=="o" && casillas[6]=="o" && casillas[1]=="o" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[6]=="o" && casillas[2]=="o" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[6]=="o" && casillas[5]=="o" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[6]=="o" && casillas[8]=="o" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[6]=="o" && casillas[7]=="o" && casillas[4]=="v" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// ABAJO

			else if (casillas[0]=="o" && casillas[3]=="o" && casillas[1]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[3]=="o" && casillas[2]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[3]=="o" && casillas[5]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[3]=="o" && casillas[8]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// ACERCAMIENTO - LINEA LATERAL ARRIBA

				//IZQUIERDA

			else if (casillas[1]=="o" && casillas[2]=="o" && casillas[5]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[2]=="o" && casillas[8]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[2]=="o" && casillas[7]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[2]=="o" && casillas[6]=="o" && casillas[0]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// MEDIO

			else if (casillas[0]=="o" && casillas[2]=="o" && casillas[5]=="o" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[2]=="o" && casillas[8]=="o" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[2]=="o" && casillas[7]=="o" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[2]=="o" && casillas[6]=="o" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[2]=="o" && casillas[3]=="o" && casillas[1]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				//DERECHA


			else if (casillas[0]=="o" && casillas[1]=="o" && casillas[8]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[1]=="o" && casillas[7]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[1]=="o" && casillas[6]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[1]=="o" && casillas[3]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

		// ACERCAMIENTO - LINEA LATERAL DERECHA

			//ARRIBA

			else if (casillas[5]=="o" && casillas[8]=="o" && casillas[7]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="o" && casillas[8]=="o" && casillas[6]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="o" && casillas[8]=="o" && casillas[3]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="o" && casillas[8]=="o" && casillas[0]=="o" && casillas[2]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// MEDIO

			else if (casillas[2]=="o" && casillas[8]=="o" && casillas[7]=="o" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[8]=="o" && casillas[6]=="o" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[8]=="o" && casillas[3]=="o" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[8]=="o" && casillas[0]=="o" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[8]=="o" && casillas[1]=="o" && casillas[5]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// ABAJO

			else if (casillas[2]=="o" && casillas[5]=="o" && casillas[6]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[5]=="o" && casillas[3]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[5]=="o" && casillas[0]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[5]=="o" && casillas[1]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// ACERCAMIENTO - LINEA LATERAL ABAJO

				//IZQUIERDA

			else if (casillas[7]=="o" && casillas[8]=="o" && casillas[0]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="o" && casillas[8]=="o" && casillas[1]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="o" && casillas[8]=="o" && casillas[2]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="o" && casillas[8]=="o" && casillas[5]=="o" && casillas[6]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				// MEDIO

			else if (casillas[6]=="o" && casillas[8]=="o" && casillas[3]=="o" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[8]=="o" && casillas[0]=="o" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[8]=="o" && casillas[1]=="o" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[8]=="o" && casillas[2]=="o" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[8]=="o" && casillas[5]=="o" && casillas[7]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

				//DERECHA

			else if (casillas[6]=="o" && casillas[7]=="o" && casillas[3]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[7]=="o" && casillas[0]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[7]=="o" && casillas[1]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[7]=="o" && casillas[2]=="o" && casillas[8]=="v" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// BÚSQUEDA DEL CENTRO DESDE DONDE NO SEA ESQUINA

			if (casillas[1]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			else if (casillas[3]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			else if (casillas[5]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}
			else if (casillas[7]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// BÚSQUEDA DEL CENTRO DESDE LAS ESQUINAS

			else if (casillas[0]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[8]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[4]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=4;
				return respuesta_movimiento_inteligente;
			}

			// BUSQUEDA DE ESQUINAS

			else if (casillas[1]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[1]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=1;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[5]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=5;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[7]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=7;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[3]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=3;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			// BUSQUEDA DE ESQUINA A NO ESQUINA

			else if (casillas[0]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[0]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=0;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[2]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=2;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[8]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[8]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=8;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[6]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=6;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}

			// BUSQUEDA DEL NO CENTRO

			else if (casillas[4]=="o" && casillas[0]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=0;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[2]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=2;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[8]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=8;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[6]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=6;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[1]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=1;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[5]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=5;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[7]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=7;
				return respuesta_movimiento_inteligente;
			}

			else if (casillas[4]=="o" && casillas[3]=="v")
			{
				respuesta_movimiento_inteligente[0]=4;
				respuesta_movimiento_inteligente[1]=3;
				return respuesta_movimiento_inteligente;
			}
		}
	}
});