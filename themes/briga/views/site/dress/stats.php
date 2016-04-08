<style>
    .stats input{
        width: 30px;
    }
    .stats .p{
        background-image: url("/images/dress/up.gif");
        background-repeat: no-repeat;
        width: 9px;
        height: 9px;
        cursor: pointer;
    }
    .stats .m{
        background-image: url("/images/dress/down.gif");
        background-repeat: no-repeat;
        width: 9px;
        height: 9px;
        cursor: pointer;
    }
    .stats #editheader1 {
        text-align: center;
    }
    .stats .hintview {
        font-size: 9px;
        color: infotext;
        border: 1px solid infotext;
        padding: 1px 1px 1px 1px;
        background: infobackground;
        line-height: 10px;
        font-size: 10px;
    }
</style>
<table style="margin-top: 10px;width:260px;" class="stats">
    <tr>
        <td id="editheader1" colspan="5">
            <div class="hintview">На 0 апе [0] уровня Вам доступно <b>0</b> родных статов. В Вашем комплекте
                используется <b>0</b> родных статов. Осталось 0 свободных статов.
            </div>
        </td>
    </tr>
    <tr>
        <td><input class="level other" rel="level" value="0"></td>
        <td class="label">Уровень</td>
        <td class="haveValue">
            <div class="level" rel="value">0</div>
        </td>
        <td>
            <div class="p other" rel="level"></div>
        </td>
        <td>
            <div class="m other" rel="level"></div>
        </td>
    </tr>
    <tr>
        <td><input class="ap other" rel="ap" value="0"></td>
        <td class="label">АП</td>
        <td>
            <div class="ap" rel="value">0</div>
        </td>
        <td>
            <div class="p other" rel="ap"></div>
        </td>
        <td>
            <div class="m other" rel="ap"></div>
        </td>
    </tr>
    <tr>
        <td colspan="5" class="separator"></td>
    </tr>
    <tr>
        <td><input class="sila stat" rel="sila" value="3"></td>
        <td class="label">Сила</td>
        <td>
            <div class="sila" rel="value">3</div>
        </td>
        <td>
            <div class="p stat" rel="sila"></div>
        </td>
        <td>
            <div class="m stat" rel="sila"></div>
        </td>
    </tr>
    <tr>
        <td><input class="lovka stat" rel="lovka" value="3"></td>
        <td class="label">Ловкость</td>
        <td>
            <div class="lovka" rel="value">3</div>
        </td>
        <td>
            <div class="p stat" rel="lovka"></div>
        </td>
        <td>
            <div class="m stat" rel="lovka"></div>
        </td>
    </tr>
    <tr>
        <td><input class="inta stat" rel="inta" value="3"></td>
        <td class="label">Интуиция</td>
        <td>
            <div class="inta" rel="value">3</div>
        </td>
        <td>
            <div class="p stat" rel="inta"></div>
        </td>
        <td>
            <div class="m stat" rel="inta"></div>
        </td>
    </tr>
    <tr>
        <td><input class="vinos stat" rel="vinos" value="3"></td>
        <td class="label">Выносливость</td>
        <td>
            <div class="vinos" rel="value">3</div>
        </td>
        <td>
            <div class="p stat" rel="vinos"></div>
        </td>
        <td>
            <div class="m stat" rel="vinos"></div>
        </td>
    </tr>
    <tr>
        <td><input class="intel stat" rel="intel" value="0"></td>
        <td class="label">Интеллект</td>
        <td>
            <div class="intel" rel="value">0</div>
        </td>
        <td>
            <div class="p stat" rel="intel"></div>
        </td>
        <td>
            <div class="m stat" rel="intel"></div>
        </td>
    </tr>
    <tr>
        <td><input class="mudra stat" rel="mudra" value="0"></td>
        <td class="label">Мудрость</td>
        <td>
            <div class="mudra" rel="mudra">0</div>
        </td>
        <td>
            <div class="p stat" rel="mudra"></div>
        </td>
        <td>
            <div class="m stat" rel="mudra"></div>
        </td>
    </tr>
    <tr>
        <td class="separator" colspan="5"></td>
    </tr>
    <tr>
        <td><input class="nog vlad" rel="nog" value="0"></td>
        <td class="label">ножами и кастетами</td>
        <td>
            <div class="nog" rel="nog">0</div>
        </td>
        <td>
            <div class="p vlad" rel="nog"></div>
        </td>
        <td>
            <div class="m vlad" rel="nog"></div>
        </td>
    </tr>
    <tr>
        <td><input class="topor vlad" rel="topor" value="0"></td>
        <td class="label">топорами и секирами</td>
        <td>
            <div class="topor" rel="value">0</div>
        </td>
        <td>
            <div class="p vlad" rel="topor"></div>
        </td>
        <td>
            <div class="m vlad" rel="topor"></div>
        </td>
    </tr>
    <tr>
        <td><input class="dubina vlad" rel="dubina" value="0"></td>
        <td class="label">дубинами, булавами</td>
        <td>
            <div class="dubina" rel="dubina">0</div>
        </td>
        <td>
            <div class="p vlad" rel="dubina"></div>
        </td>
        <td>
            <div class="m vlad" rel="dubina"></div>
        </td>
    </tr>
    <tr>
        <td><input class="mech vlad" rel="mech" value="0"></td>
        <td class="label">мечами</td>
        <td>
            <div class="mech" rel="value">0</div>
        </td>
        <td>
            <div class="p vlad" rel="mech"></div>
        </td>
        <td>
            <div class="m vlad" rel="mech"></div>
        </td>
    </tr>
</table>