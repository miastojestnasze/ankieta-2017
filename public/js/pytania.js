$(document).ready(function(){
  $("#token").val(document.location.search.match(/\?token=(.*)/)[1]);
	$("#q0").hide(); $("#q1").hide(); $("#q2").hide(); $("#q3").hide(); $("#q4").hide(); $("#q5").hide(); $("#q6").hide(); $("#q7").hide(); $("#q8").hide(); $("#q9").hide(); $("#watch1").hide(); $("#watch2").hide(); $("#watch3").hide();
	$("#nint").click(function(){
		$("#qint").hide();
		$("#q0").fadeIn();
	});
	$("#p0").click(function(){
		$("#q0").hide();
		$("#qint").fadeIn();
	});
	$("#n1").click(function(){
		if (!$("input[name=P1_1]").is(":checked"), !$("input[name=P1_2]").is(":checked"), !$("input[name=P1_3]").is(":checked"), !$("input[name=P1_4]").is(":checked"), !$("input[name=P1_5]").is(":checked"), !$("input[name=P1_6]").is(":checked"), !$("input[name=P1_8]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q0").hide();
		$("#q1").fadeIn();
		}
	});
	$("#p1").click(function(){
		$("#q1").hide();
		$("#q0").fadeIn();
	});
	$("#n2").click(function(){
		if (!$("input[name=P2_1]").is(":checked"), !$("input[name=P2_2]").is(":checked"), !$("input[name=P2_3]").is(":checked"), !$("input[name=P2_7]").is(":checked"), !$("input[name=P2_8]").is(":checked"), !$("input[name=P2_9]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q1").hide();
		$("#q2").fadeIn();
		}
	});
	$("#p2").click(function(){
		$("#q2").hide();
		$("#q1").fadeIn();
	});
	$("#n3").click(function(){
		if (!$("input[name=P3_1]").is(":checked"), !$("input[name=P3_2]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q2").hide();
		$("#q3").fadeIn();
		}
	});
	$("#p3").click(function(){
		$("#q3").hide();
		$("#q2").fadeIn();
	});
	$("#n4").click(function(){
		if (!$("input[name=P4_1]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q3").hide();
		$("#q4").fadeIn();
		}
	});
	$("#p4").click(function(){
		$("#q4").hide();
		$("#q3").fadeIn();
	});
	$("#n5").click(function(){
		if (!$("input[name=P5_1]").is(":checked"), !$("input[name=P5_2]").is(":checked"), !$("input[name=P5_3]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q4").hide();
		$("#q5").fadeIn();
		}
	});
	$("#p5").click(function(){
		$("#q5").hide();
		$("#q4").fadeIn();
	});
	$("#n6").click(function(){
		if (!$("input[name=P6_1]").is(":checked"), !$("input[name=P6_2]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q5").hide();
		$("#q6").fadeIn();
		}
	});
	$("#p6").click(function(){
		$("#q6").hide();
		$("#q5").fadeIn();
	});
	$("#n7").click(function(){
		if (!$("input[name=P7_1]").is(":checked"), !$("input[name=P7_2]").is(":checked"), !$("input[name=P7_3]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q6").hide();
		$("#q7").fadeIn();
		}
	});
	$("#p7").click(function(){
		$("#q7").hide();
		$("#q6").fadeIn();
	});
	$("#n8").click(function(){
		if (!$("input[name=P8_1]").is(":checked"), !$("input[name=P8_2]").is(":checked"), !$("input[name=P8_3]").is(":checked"), !$("input[name=P8_4]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.') }
		else {
		$("#q7").hide();
		$("#q8").fadeIn();
		}
	});
	$("#p8").click(function(){
		$("#q8").hide();
		$("#q7").fadeIn();
	});
	$("#n9").click(function(){
		if (!$("input[name=P9_1]").is(":checked"), !$("input[name=P9_2]").is(":checked"), !$("input[name=P9_3]").is(":checked"), !$("input[name=P9_4]").is(":checked"))
		{ alert('Proszę wybrać odpowiedź.');
		return false;
		}
	});
	$("#en1").change(function() {
        $("#t1").removeAttr('disabled');
    });
	$("#en2").change(function() {
        $("#t2").removeAttr('disabled');
    });
	$("#en3").change(function() {
        $("#t3").removeAttr('disabled');
    });
	$("#en4").change(function() {
        $("#t4").removeAttr('disabled');
    });
	$("#en5").change(function() {
        $("#t5").removeAttr('disabled');
    });
	$("#en6").change(function() {
        $("#t6").removeAttr('disabled');
    });
	$("#en7").change(function() {
        $("#t7").removeAttr('disabled');
    });
	$("#en8").change(function() {
        $("#t8").removeAttr('disabled');
    });
	$("#en9").change(function() {
        $("#t9").removeAttr('disabled');
    });
	$("#en10").change(function() {
        $("#t10").removeAttr('disabled');
    });
	$("#en11").change(function() {
        $("#t11").removeAttr('disabled');
    });
	$("#en12").change(function() {
        $("#t12").removeAttr('disabled');
    });
	$('input[name="P6_1"]').change(function() {
		if($(this).attr('id') == 'show1')
		{
			$('#watch1').fadeIn();
		} else {
			$('#watch1').fadeOut();
			$('textarea[name="P6_1U"]').val('');
		}
	});
	$('input[name="P6_2"]').change(function() {
		if($(this).attr('id') == 'show2') {
			$('#watch2').fadeIn();
		} else {
			$('#watch2').fadeOut();
			$('input[name="P6_3"]').prop('checked', false);
			$('textarea[name="P6_3U"]').val('');
		}
	});
	$('input[name="P7_3"]').change(function() {
		if($(this).attr('id') == 'show3') {
			$('#watch3').fadeIn();
		} else {
			$('#watch3').fadeOut();
			$('input[name="P7_4"]').prop('checked', false);
			$('textarea[name="P7_4U"]').val('');
		}
	});
	$("#s1").slider({min: 1, max: 10, focus: true});
	$("#s2").slider({min: 1, max: 10, focus: true});
	$("#s3").slider({min: 1, max: 10, focus: true});
	$("#s4").slider({min: 1, max: 10, focus: true});
	$("#f1").click(function() {
		if(this.checked) {
			$("#s2").slider("disable");
		} else {
			$("#s2").slider("enable");
		}
    });
	$("#f2").click(function() {
		if(this.checked) {
			$("#s3").slider("disable");
		} else {
			$("#s3").slider("enable");
		}
    });
	$("#f3").click(function() {
		if(this.checked) {
			$("#s4").slider("disable");
		} else {
			$("#s4").slider("enable");
		}
    });
	
});
