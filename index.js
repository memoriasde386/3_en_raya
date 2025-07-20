window.addEventListener("load", function ()
{
	var tres_enraya = document.querySelector('#tres_en_raya');
	var guardar_partida = document.querySelector('#guardar_partida');

	var resultado_modalidad_de_juego;
	var resultado_humano_contra;
	var resultado_quien_empieza_maquina_o_humano;
	var resultado_quien_empieza_equis_o_circulos;
	var resultado_nivel_de_dificultad;	

	var cont;

	var modalidad_de_juego;
	var humano_contra;
	var quien_empieza_maquina_o_humano;
	var quien_empieza_equis_o_circulos;
	var nivel_de_dificultad;

	if (localStorage.getItem("local_storsge_modalidad_de_juego")=="fijas") document.getElementById('modalidad_fijas').checked = true;
	else if (localStorage.getItem("local_storsge_modalidad_de_juego")=="movibles") document.getElementById('modalidad_movibles').checked = true;

	if (localStorage.getItem("local_storsge_humano_contra")=="maquina") document.getElementById('humano_contra_maquina').checked = true;
	else if (localStorage.getItem("local_storsge_humano_contra")=="humano") document.getElementById('humano_contra_humano').checked = true;

	if (localStorage.getItem("local_storsge_quien_empieza_maquina_o_humano")=="maquina") document.getElementById('quien_empieza_maquina').checked = true;
	else if (localStorage.getItem("local_storsge_quien_empieza_maquina_o_humano")=="humano") document.getElementById('quien_empieza_humano').checked = true;

	if (localStorage.getItem("local_storsge_quien_empieza_equis_o_circulos")=="equis") document.getElementById('quien_empieza_equis').checked = true;
	else if (localStorage.getItem("local_storsge_quien_empieza_equis_o_circulos")=="circulos") document.getElementById('quien_empieza_circulos').checked = true;

	if (localStorage.getItem("local_storsge_nivel_de_dificultad")=="0") document.getElementById('valor_0').checked = true;
	else if (localStorage.getItem("local_storsge_nivel_de_dificultad")=="1") document.getElementById('valor_1').checked = true;
	else if (localStorage.getItem("local_storsge_nivel_de_dificultad")=="2") document.getElementById('valor_2').checked = true;
	else if (localStorage.getItem("local_storsge_nivel_de_dificultad")=="3") document.getElementById('valor_3').checked = true;
	else if (localStorage.getItem("local_storsge_nivel_de_dificultad")=="4") document.getElementById('valor_4').checked = true;

	guardar_partida.onclick = function ()
	{
		alert("Los ajustes se han guardado correctamente");

		modalidad_de_juego=document.getElementsByName("modalidad_de_juego");

		for(cont=0;cont<2;cont++)
        {
            if(modalidad_de_juego[cont].checked)  resultado_modalidad_de_juego=modalidad_de_juego[cont].value;            
        }

        humano_contra=document.getElementsByName("humano_contra");

		for(cont=0;cont<2;cont++)
        {
            if(humano_contra[cont].checked) resultado_humano_contra=humano_contra[cont].value;
        }

		quien_empieza_maquina_o_humano=document.getElementsByName("quien_empieza_maquina_o_humano");

		for(cont=0;cont<2;cont++)
        {
            if(quien_empieza_maquina_o_humano[cont].checked) resultado_quien_empieza_maquina_o_humano=quien_empieza_maquina_o_humano[cont].value;
        }

		quien_empieza_equis_o_circulos=document.getElementsByName("quien_empieza_equis_o_circulos");

		for(cont=0;cont<2;cont++)
        {
            if(quien_empieza_equis_o_circulos[cont].checked) resultado_quien_empieza_equis_o_circulos=quien_empieza_equis_o_circulos[cont].value;
        }

		nivel_de_dificultad=document.getElementsByName("nivel_de_dificultad");

		for(cont=0;cont<5;cont++)
        {
            if(nivel_de_dificultad[cont].checked) resultado_nivel_de_dificultad=nivel_de_dificultad[cont].value;
        }

		localStorage.setItem("local_storsge_modalidad_de_juego", resultado_modalidad_de_juego);
		localStorage.setItem("local_storsge_humano_contra", resultado_humano_contra);
		localStorage.setItem("local_storsge_quien_empieza_maquina_o_humano", resultado_quien_empieza_maquina_o_humano);
		localStorage.setItem("local_storsge_quien_empieza_equis_o_circulos", resultado_quien_empieza_equis_o_circulos);
		localStorage.setItem("local_storsge_nivel_de_dificultad", resultado_nivel_de_dificultad);
	}


	tres_enraya.onclick = function ()
	{

		modalidad_de_juego=document.getElementsByName("modalidad_de_juego");

		for(cont=0;cont<2;cont++)
        {
            if(modalidad_de_juego[cont].checked)  resultado_modalidad_de_juego=modalidad_de_juego[cont].value;            
        }

        humano_contra=document.getElementsByName("humano_contra");

		for(cont=0;cont<2;cont++)
        {
            if(humano_contra[cont].checked) resultado_humano_contra=humano_contra[cont].value;
        }

		quien_empieza_maquina_o_humano=document.getElementsByName("quien_empieza_maquina_o_humano");

		for(cont=0;cont<2;cont++)
        {
            if(quien_empieza_maquina_o_humano[cont].checked) resultado_quien_empieza_maquina_o_humano=quien_empieza_maquina_o_humano[cont].value;
        }

		quien_empieza_equis_o_circulos=document.getElementsByName("quien_empieza_equis_o_circulos");

		for(cont=0;cont<2;cont++)
        {
            if(quien_empieza_equis_o_circulos[cont].checked) resultado_quien_empieza_equis_o_circulos=quien_empieza_equis_o_circulos[cont].value;
        }

		nivel_de_dificultad=document.getElementsByName("nivel_de_dificultad");

		for(cont=0;cont<5;cont++)
        {
            if(nivel_de_dificultad[cont].checked) resultado_nivel_de_dificultad=nivel_de_dificultad[cont].value;
        }

        sessionStorage.setItem("session_storsge_modalidad_de_juego", resultado_modalidad_de_juego);
		sessionStorage.setItem("session_storsge_humano_contra", resultado_humano_contra);
		sessionStorage.setItem("session_storsge_quien_empieza_maquina_o_humano", resultado_quien_empieza_maquina_o_humano);
		sessionStorage.setItem("session_storsge_quien_empieza_equis_o_circulos", resultado_quien_empieza_equis_o_circulos);
		sessionStorage.setItem("session_storsge_nivel_de_dificultad", resultado_nivel_de_dificultad);

	}	
});














































