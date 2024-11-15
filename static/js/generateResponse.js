
function pdf(){
    window.jsPDF = window.jspdf.jsPDF
    let srcwidth = document.getElementById('container').scrollWidth;
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(document.getElementById('container'), {
        html2canvas: {
            scale: 600 / srcwidth
            //600 is the width of a4 page. 'a4': [595.28, 841.89]
        },
        callback: function () {
            window.open(pdf.output('my_pdf_test'));
        }
    });
    alert("pdf done");
    }
