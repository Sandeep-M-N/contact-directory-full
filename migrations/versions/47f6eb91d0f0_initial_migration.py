"""Initial migration.

Revision ID: 47f6eb91d0f0
Revises: 
Create Date: 2024-10-27 12:43:23.480351

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47f6eb91d0f0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('group')
    with op.batch_alter_table('contact', schema=None) as batch_op:
        batch_op.add_column(sa.Column('group_name', sa.String(length=80), nullable=True))
        batch_op.drop_constraint('contact_group_id_fkey', type_='foreignkey')
        batch_op.drop_column('group_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('contact', schema=None) as batch_op:
        batch_op.add_column(sa.Column('group_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('contact_group_id_fkey', 'group', ['group_id'], ['id'])
        batch_op.drop_column('group_name')

    op.create_table('group',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=80), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='group_pkey')
    )
    # ### end Alembic commands ###
